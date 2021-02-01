import * as UserValidator from './validator';
import {
  RegisterRequestBody,
  BaseServiceReturnType,
  RegistrationFailedResponse,
  RegistrationSuccessResponse,
} from './usertypes';
import registerUser from './register';

jest.mock('../../models/User');

describe('user registration service tests', () => {
  const mockedValidateUserRegisterBody = jest.spyOn(
    UserValidator,
    'validateUserRegisterBody'
  );
  const dummyProperUserRegisterRequestBody: RegisterRequestBody = {
    name: 'John Doe',
    username: 'johndoe',
    password: 'password',
  };
  const dummyImproperUserRegisterRequestBody: RegisterRequestBody = {
    name: '',
    username: 'john doe',
    password: '',
  };

  afterEach(() => {
    mockedValidateUserRegisterBody.mockClear();
  });

  it('should call validateUserRegisterBody', async () => {
    await registerUser(dummyProperUserRegisterRequestBody);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
  });

  it('should call validateUserRegisterBody with the proper arguments', async () => {
    await registerUser(dummyProperUserRegisterRequestBody);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenLastCalledWith(
      dummyProperUserRegisterRequestBody
    );
  });

  it("should return the right response object if the request doesn't pass validation", async () => {
    const improperResponseCall = (await registerUser(
      dummyImproperUserRegisterRequestBody
    )) as BaseServiceReturnType<RegistrationFailedResponse>;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    const improperResponse = improperResponseCall.payload;

    expect('name' in improperResponse).toBe(true);
    expect('password' in improperResponse).toBe(true);
  });

  it("should return the right response value if the request doesn't pass validation", async () => {
    const improperResponseCall = (await registerUser(
      dummyImproperUserRegisterRequestBody
    )) as BaseServiceReturnType<RegistrationSuccessResponse>;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    const improperResponse = improperResponseCall.payload;

    expect('name' in improperResponse).toBe(true);
    expect('password' in improperResponse).toBe(true);

    expect(improperResponse.name).toMatch('string.empty');
  });
});
