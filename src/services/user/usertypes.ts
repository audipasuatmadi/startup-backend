export interface RegisterRequestBody {
  name: string;
  username: string;
  password: string;
}

export interface RegistrationFailedResponse {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export interface BaseServiceReturnType<T> {
  status: number;
  payload: T;
}

export interface UserAttributes extends RegisterRequestBody {
  id: number;
}

export interface RegistrationSuccessResponse {
  username: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export const returnResponseSchema = (
  status: number,
  payload: any
): BaseServiceReturnType<RegistrationSuccessResponse | RegistrationFailedResponse> => ({ status, payload });
