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
};

export default TokenRepository;
