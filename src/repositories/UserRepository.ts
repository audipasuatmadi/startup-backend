import UserModel from '../models/User'
import { UserCredentials, UserInstance } from '../services/user/usertypes'

const UserRepository = {
  async getUserByUsername(username: string) {
    let userData: UserInstance | null; 
    try {
      userData = await UserModel.findOne({where: {username: username}})
    } catch (e) {
      throw e
    }
    return userData
  },

  async getUserById(id: number) {
    let userData: UserInstance | null; 
    try {
      userData = await UserModel.findByPk(id)
    } catch (e) {
      throw e
    }
    return userData
  },

  async createNewUser(userCredentials: UserCredentials) {
    try {
      const user = await UserModel.create(userCredentials)
      return user;
    } catch (e) {
      throw e
    }
  }
}

export default UserRepository