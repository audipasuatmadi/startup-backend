import * as UserValidator from './validator';
import { RegisterRequestBody, RegisterValidationFailed } from './usertypes';
import registerUser from './register';

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
    const improperResponse = (await registerUser(
      dummyImproperUserRegisterRequestBody
    )) as RegisterValidationFailed;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    expect('isImproperInput' in improperResponse).toBe(true);
    expect('improperInputDetails' in improperResponse).toBe(true);
  });

  it("should return the right response value if the request doesn't pass validation", async () => {
    const improperResponse = (await registerUser(
      dummyImproperUserRegisterRequestBody
    )) as RegisterValidationFailed;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    expect('isImproperInput' in improperResponse).toBe(true);
    expect('improperInputDetails' in improperResponse).toBe(true);

    expect(improperResponse.isImproperInput).toBe(true);
    expect(improperResponse.improperInputDetails.name).toMatch('string.empty');
  });
});
