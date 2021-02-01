export interface RegisterRequestBody {
  name: string;
  username: string;
  password: string;
}

export interface ImproperInputResponse {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export interface RegisterValidationFailed {
  isImproperInput: boolean;
  improperInputDetails: ImproperInputResponse;
}

export interface BaseServiceReturnType {
  status: number;
  payload: any;
}

export interface UserAttributes extends RegisterRequestBody {
  id: number;
}

export interface AuthenticationResponsePayload {
  username: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export const returnResponseSchema = (
  status: number,
  payload: any
): BaseServiceReturnType => ({ status, payload });
