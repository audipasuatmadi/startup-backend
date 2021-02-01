import {
  RegisterRequestBody,
  RegisterValidationFailed,
  returnResponseSchema,
  AuthenticationResponsePayload,
} from './usertypes';
import bcrypt from 'bcrypt';
import { validateUserRegisterBody } from './validator';
import { ValidationError } from 'joi';
import User from '../../models/User';
import jwt from 'jsonwebtoken';


const registerUser = async (requestBody: RegisterRequestBody) => {
  try {
    const validationResponse = await validateUserRegisterBody(requestBody);
    if ('isJoi' in validationResponse) throw validationResponse;
  } catch (e) {
    const validationError: RegisterValidationFailed = {
      isImproperInput: true,
      improperInputDetails: (e as ValidationError).details
        .map((errorItem) => ({ [errorItem.context?.key!]: errorItem.type }))
        .reduce(
          (previousVal, currentVal) => ({ ...previousVal, ...currentVal }),
          {}
        ),
    };

    return returnResponseSchema(403, validationError);
  }

  try {
    const existingUsername = await User.findOne({
      where: { username: requestBody.username },
    });
    if (existingUsername !== null) {
      throw existingUsername.username;
    }
  } catch (e) {
    const errorFeedback: RegisterValidationFailed = {
      isImproperInput: true,
      improperInputDetails: {
        username: `username.exists.${e as string}`,
      },
    };
    return returnResponseSchema(403, errorFeedback);
  }

  try {
    const generatedSalt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(
      requestBody.password,
      generatedSalt
    );
    await User.create({
      name: requestBody.name,
      password: hashedPassword,
      username: requestBody.username,
    });
  } catch (e) {
    const errorFeedback: RegisterValidationFailed = {
      isImproperInput: true,
      improperInputDetails: {
        otherMessage:
          'Something is wrong with the server, please contact our team. Thank you!',
      },
    };
    return returnResponseSchema(500, errorFeedback);
  }

  const publicCredentials = {
    username: requestBody.username,
    name: requestBody.name
  }

  try {
    console.log('whatt')
    console.log(process.env.REFRESH_TOKEN_SECRET)
    const refreshToken = jwt.sign(publicCredentials, process.env.REFRESH_TOKEN_SECRET!)
    console.log('whatt')
    const accessToken = jwt.sign(publicCredentials, process.env.ACCESS_TOKEN_SECRET!)
    console.log('whatt')

    const response: AuthenticationResponsePayload = {
      ...publicCredentials,
      accessToken,
      refreshToken
    }
    console.log('whatt')
    return returnResponseSchema(201, response);
  } catch (e) {
    return returnResponseSchema(500, 'something is wrong oh noee')
  }


};

export default registerUser;
