import {
  RegisterRequestBody,
  RegistrationFailedResponse,
  returnResponseSchema,
  RegistrationSuccessResponse,
  UserInstance,
} from './usertypes';
import bcrypt from 'bcrypt';
import { validateUserRegisterBody } from './validator';
import { ValidationError } from 'joi';
import TokensService from '../tokens'
import UserRepository from '../../repositories/UserRepository';

const registerUser = async (requestBody: RegisterRequestBody) => {
  try {
    const validationResponse = await validateUserRegisterBody(requestBody);
    if ('isJoi' in validationResponse) throw validationResponse;
  } catch (e) {
    const validationError: RegistrationFailedResponse = (e as ValidationError).details
      .map((errorItem) => ({ [errorItem.context?.key!]: errorItem.message }))
      .reduce(
        (previousVal, currentVal) => ({ ...previousVal, ...currentVal }),
        {}
      );

    return returnResponseSchema(403, validationError);
  }

  try {
    const existingUsername = await UserRepository.getUserByUsername(
      requestBody.username
    );
    if (existingUsername !== null) {
      throw existingUsername.username;
    }
  } catch (e) {
    const errorFeedback: RegistrationFailedResponse = {
      username: `username ${e as string} telah dipakai`,
    };
    return returnResponseSchema(403, errorFeedback);
  }

  let user: UserInstance

  try {
    const generatedSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      requestBody.password,
      generatedSalt
    );
    user = await UserRepository.createNewUser({
      name: requestBody.name,
      password: hashedPassword,
      username: requestBody.username,
    });
  } catch (e) {
    const errorFeedback: RegistrationFailedResponse = {
      otherMessage:
        'Something is wrong with the server, please contact our team. Thank you!',
    };
    return returnResponseSchema(500, errorFeedback);
  }

  const publicCredentials = {
    username: requestBody.username,
    name: requestBody.name,
  };

  try {
    const refreshToken = await TokensService.generateRefreshToken(publicCredentials, user.id)
    const accessToken = TokensService.generateAccessToken(publicCredentials)
    const response: RegistrationSuccessResponse = {
      ...publicCredentials,
      accessToken,
      refreshToken,
    };
    return returnResponseSchema(201, response);
  } catch (e) {
    return returnResponseSchema(500, 'something is wrong oh noee');
  }
};

export default registerUser;
