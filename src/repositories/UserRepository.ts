import User from '../models/User';
import { UserCredentials, UserInstance } from '../services/user/usertypes';

const UserRepository = {
  async getUserByUsername(username: string) {
    let userData: User | null;
    try {
      userData = await User.findOne({ where: { username: username } });
    } catch (e) {
      throw e;
    }
    return userData;
  },

  async getUserById(id: number) {
    let userData: User | null;
    try {
      userData = await User.findByPk(id);
    } catch (e) {
      throw e;
    }
    return userData;
  },

  async createNewUser(userCredentials: UserCredentials) {
    try {
      const user = await User.create(userCredentials);
      return user;
    } catch (e) {
      throw e;
    }
  },
};

export default UserRepository;
