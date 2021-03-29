import { Optional, Model } from 'sequelize/types';

export interface RegisterRequestBody {
  name: string;
  username: string;
  password: string;
}

export interface UserCredentials extends RegisterRequestBody {}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegistrationFailedResponse {
  name?: string;
  username?: string;
  password?: string;
  otherMessage?: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export interface TokenAttributes {
  id: number;
  token: string;
  expiresIn: Date;
  userId: number;
}

export interface TokenCreationAttributes
  extends Optional<TokenAttributes, "id" & "userId"> {}

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

export interface BaseServiceReturnType<T> {
  status: number;
  payload: T;
}

export interface UserAttributes extends RegisterRequestBody {
  id: number;
}

export interface AuthenticationTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegistrationSuccessResponse {
  username: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginSuccessResponse extends RegistrationSuccessResponse {}

export interface LoginFailedResponse {
  username?: string;
  password?: string;
  otherMessage?: string;
}

export const returnResponseSchema = (
  status: number,
  payload: any
): BaseServiceReturnType<
  RegistrationSuccessResponse | RegistrationFailedResponse
> => ({ status, payload });

export const loginServiceReturnSchema = (
  status: number,
  payload: any
): BaseServiceReturnType<LoginSuccessResponse | LoginFailedResponse> => ({
  status,
  payload,
});
