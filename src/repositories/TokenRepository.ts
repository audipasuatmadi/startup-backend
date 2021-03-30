import Token from '../models/Token';
import User from '../models/User';

const TokenRepository = {
  async getRefreshTokenByUser(User: User) {
    let token: Token | null;
    try {
      token = await User.getToken();
    } catch (e) {
      throw e;
    }
    return token;
  },

  async removeTokenByUserId(userId: number) {
    let token: Token | null;
    try {
      token = await Token.findOne({where: {userId: userId}});
    } catch (e) {
      throw e;
    }

    if (!token) return false;
  
    token.destroy();
    return true;
  } 
};

export default TokenRepository;
