import UserRepository from '../../repositories/UserRepository';
import TokensService from '../tokens';

const logoutUser = async (username: string) => {
  const userInstance = await UserRepository.getUserByUsername(username);
  if (!userInstance) return false;

  const result = await TokensService.removeTokenByUserId(userInstance.id);
  return result;
};

export default logoutUser;
