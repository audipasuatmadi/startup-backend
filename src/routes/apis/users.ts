import express from 'express';
import registerUser from '../../services/user/register';
import {
  RegisterRequestBody,
  LoginCredentials,
  AuthenticationTokens,
} from '../../services/user/usertypes';
import loginUser from '../../services/user/login';
import {
  validateAccessToken,
  getTokenFromBearer,
  generateAccessToken,
  generateAccessTokenByRefreshToken,
} from '../../services/tokens';
import logoutUser from '../../services/user/logout';
const router = express.Router();

router.post('/', async (req, res) => {
  const requestBody = req.body as RegisterRequestBody;
  const result = await registerUser(requestBody);
  res.status(result.status).json(result.payload);
});

router.post('/login', async (req, res) => {
  const requestBody = req.body as LoginCredentials;
  const result = await loginUser(requestBody);
  res.status(result.status).json(result.payload);
});

router.post('/validate', async (req, res) => {
  const requestBody = req.body as AuthenticationTokens;
  const { refreshToken } = requestBody;
  const userCredentials = await generateAccessTokenByRefreshToken(refreshToken);
  res.status(userCredentials.status).json(userCredentials.payload);
});

router.post('/logout', async (req, res) => {
  const requestBody = req.body as { username: string };

  const removalProcess = await logoutUser(requestBody.username);
  res.status(removalProcess ? 200 : 500);
});

export default router;
