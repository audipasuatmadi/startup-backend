import loginUser from './login';
import UserRepository from '../../repositories/UserRepository';
import TokenService from '../tokens/index';
import bcrypt from 'bcrypt'

import {
  LoginCredentials,
  UserAttributes,
  loginServiceReturnSchema,
} from './usertypes';

jest.mock('../../repositories/UserRepository');
jest.mock('../tokens/index.ts');
jest.mock('bcrypt')

describe('login functionality tests', () => {
  let mockedGetUserByUsername: jest.Mock;
  let mockedGenerateRefreshToken: jest.Mock;
  let mockedGenerateAccessToken: jest.Mock;
  let mockedBCrypt: jest.Mock

  const dummyUserCredentials: LoginCredentials = {
    username: 'johndoe',
    password: "John Doe's password",
  };

  const dummyUserModel: UserAttributes = {
    id: 1,
    name: 'John Doe',
    password: "John Doe's password",
    username: 'johndoe',
  };

  beforeEach(() => {
    mockedGetUserByUsername = UserRepository.getUserByUsername as jest.Mock;
    mockedBCrypt = bcrypt.compare as jest.Mock
    mockedGenerateAccessToken = TokenService.generateAccessToken as jest.Mock;
    mockedGenerateRefreshToken = TokenService.generateRefreshToken as jest.Mock;
  });

  afterEach(() => {
    mockedGetUserByUsername.mockClear();
    mockedBCrypt.mockClear()
    mockedGenerateAccessToken.mockClear()
    mockedGenerateRefreshToken.mockClear()
  });

  it('should call getUserByUsername to get the user model', async () => {
    await loginUser(dummyUserCredentials);
    expect(mockedGetUserByUsername).toHaveBeenCalledTimes(1);
    expect(mockedGetUserByUsername).toHaveBeenCalledWith(
      dummyUserCredentials.username
    );
  });

  it('should return the right response if user cannot be found', async () => {
    mockedGetUserByUsername.mockReturnValue(null);
    const returnData = await loginUser(dummyUserCredentials);
    expect(returnData).toStrictEqual(
      loginServiceReturnSchema(403, { username: 'user tidak ditemukan' })
    );
  });

  it('should compare the encrypted password if user exists', async () => {
    mockedGetUserByUsername.mockReturnValue(dummyUserModel)
    await loginUser(dummyUserCredentials)
    expect(mockedBCrypt).toHaveBeenCalledTimes(1)
  })

  it('should return the right data if bcrypt comparison failed', async () => {
    mockedGetUserByUsername.mockReturnValue(dummyUserModel)
    mockedBCrypt.mockReturnValue(false);
    const returnData = await loginUser(dummyUserCredentials)
    expect(returnData).toStrictEqual(loginServiceReturnSchema(403, {password: 'password anda salah'}))
  })

  it('should call generate both tokens if all previous steps succeed', async () => {
    mockedGetUserByUsername.mockReturnValue(dummyUserModel)
    mockedBCrypt.mockReturnValue(true);
    await loginUser(dummyUserCredentials)
    expect(mockedGenerateAccessToken).toHaveBeenCalledTimes(1)
    expect(mockedGenerateRefreshToken).toHaveBeenCalledTimes(1)
  })

  it('should return the right response if all procedure succeed', async () => {
    mockedGetUserByUsername.mockReturnValue(dummyUserModel)
    mockedBCrypt.mockReturnValue(true);
    mockedGenerateAccessToken.mockReturnValue('awd');
    mockedGenerateRefreshToken.mockReturnValue('awdad');

    const returnData = await loginUser(dummyUserCredentials);
    expect(returnData.status).toBe(200);
    expect(returnData.payload).toStrictEqual({
      username: dummyUserModel.username,
      name: dummyUserModel.name,
      accessToken: 'awd',
      refreshToken: 'awdad'
    })

  })





});
