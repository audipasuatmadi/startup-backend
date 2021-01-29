import { RegisterRequestBody, RegisterValidationFailed, ImproperInputResponse } from "./usertypes"
import { validateUserRegisterBody } from "./validator";
import { ValidationError, ValidationErrorItem } from "joi";

const registerUser = async (requestBody: RegisterRequestBody) => {
  try {
    const validationResponse = await validateUserRegisterBody(requestBody)
    if ('isJoi' in validationResponse){ 
      throw validationResponse;
    } else {
      return validationResponse
    }
  }
  catch (e) {
    const joiValidationError = e as ValidationError
    const sanitizedErrorDetails: ImproperInputResponse[] = joiValidationError.details.map((errorItem) => ({[errorItem.context?.key!]: errorItem.type}))
    const reducedErrorDetails: ImproperInputResponse = sanitizedErrorDetails.reduce((previousVal, currentVal) => ({...previousVal, ...currentVal}), {})

    const validationError: RegisterValidationFailed = {
      isImproperInput: true,
      improperInputDetails: reducedErrorDetails
    }

    
    return validationError
  }
  
}

export default registerUser