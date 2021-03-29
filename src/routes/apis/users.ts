import express from 'express';
import registerUser from '../../services/user/register';
import {
  RegisterRequestBody,
  LoginCredentials,
  AuthenticationTokens,
} from '../../services/user/usertypes';
import loginUser from '../../services/user/login';
import { validateAccessToken, getTokenFromBearer, generateAccessToken, generateAccessTokenByRefreshToken } from '../../services/tokens';
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
  const { accessToken, refreshToken } = requestBody;
  const validation = validateAccessToken(accessToken);
  if (validation.status != 200) { //TODO: change to !=
    const newAccessToken = await generateAccessTokenByRefreshToken(refreshToken);
    res.status(newAccessToken.status).json(newAccessToken.payload);
  } else {
    res.status(validation!.status).json(validation!.payload);
  }
});

export default router;