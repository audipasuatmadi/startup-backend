import { RegisterRequestBody } from './usertypes';
import Joi, { ValidationError } from 'joi';

const baseValidationMessage = {
  'string.lowercase': '{{#label}} tidak boleh mengandung huruf besar',
  'string.trim': '{{#label}} tidak boleh mengandung spasi',
  'string.empty': '{{#label}} harus diisi',
};

const userRegisterBodySchema = Joi.object({
  name: Joi.string().trim().required().messages(baseValidationMessage),

  username: Joi.string()
    .trim()
    .lowercase()
    .required()
    .pattern(new RegExp('^\\S*$'))
    .messages({
      'string.pattern.base': '{{#label}} tidak boleh mengandung spasi',
      ...baseValidationMessage,
    }),

  password: Joi.string().required().messages(baseValidationMessage),
});

export const validateUserRegisterBody = async (
  userRegisterBody: RegisterRequestBody
) => {
  try {
    const validateResult = await userRegisterBodySchema.validateAsync(
      userRegisterBody,
      { abortEarly: false, convert: false }
    );
    const validateDecision = validateResult as RegisterRequestBody;
    return validateDecision
  } catch (e) {
    const validateDecision = e as ValidationError;
    return validateDecision
  }
};
