import * as UserValidator from './validator';
import { RegisterRequestBody, BaseServiceReturnType } from './usertypes';
import registerUser from './register';
import User from '../../models/User';



jest.mock('../../models/User')

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
    )) as BaseServiceReturnType;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    const improperResponse = improperResponseCall.payload

    expect('isImproperInput' in improperResponse).toBe(true);
    expect('improperInputDetails' in improperResponse).toBe(true);
  });

  it("should return the right response value if the request doesn't pass validation", async () => {
    const improperResponseCall = (await registerUser(
      dummyImproperUserRegisterRequestBody
    )) as BaseServiceReturnType;
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledTimes(1);
    expect(mockedValidateUserRegisterBody).toHaveBeenCalledWith(
      dummyImproperUserRegisterRequestBody
    );

    const improperResponse = improperResponseCall.payload

    expect('isImproperInput' in improperResponse).toBe(true);
    expect('improperInputDetails' in improperResponse).toBe(true);

    expect(improperResponse.isImproperInput).toBe(true);
    expect(improperResponse.improperInputDetails.name).toMatch('string.empty');
  });
});
