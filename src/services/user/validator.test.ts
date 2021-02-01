import Request from 'supertest';
import { RegisterRequestBody } from './usertypes';
import * as UserValidator from './validator';
import { ValidationResult, ValidationError } from 'joi';

const dummyProperRequest: RegisterRequestBody = {
  name: 'John Doe',
  username: 'johndoe',
  password: 'password',
};

describe('user register validator functionality tests', () => {
  let mockedUserRegisterValidator: jest.SpyInstance;
  beforeEach(() => {
    mockedUserRegisterValidator = jest.spyOn(
      UserValidator,
      'validateUserRegisterBody'
    );
  });

  afterEach(() => {
    mockedUserRegisterValidator.mockRestore();
  });

  it('should validates if the input data is proper', async () => {
    const validationReturn = await UserValidator.validateUserRegisterBody(
      dummyProperRequest
    );

    expect(mockedUserRegisterValidator).toHaveBeenCalledTimes(1);
    expect('_original' in validationReturn).toBe(false);
    expect('details' in validationReturn).toBe(false);
    expect(JSON.stringify(validationReturn)).toMatch(
      JSON.stringify(dummyProperRequest)
    );
  });

  it('should return the proper value if the input data is not proper', async () => {
    const dummyImproperRequest = {
      name: '',
      username: 'With Caps and Space',
      password: '',
    };

    const validationReturn = (await UserValidator.validateUserRegisterBody(
      dummyImproperRequest
    )) as ValidationError;

    expect(mockedUserRegisterValidator).toHaveBeenCalledTimes(1);
    expect('_original' in validationReturn).toBe(true);
    expect('details' in validationReturn).toBe(true);
    expect(validationReturn.details[0].type).toEqual('string.empty');
    expect(validationReturn.details[1].type).toEqual('string.lowercase');
    expect(validationReturn.details[2].type).toEqual('string.pattern.base');
  });
});
