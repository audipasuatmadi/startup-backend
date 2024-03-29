import express from 'express';
import registerUser from '../../services/user/register';
import {
  RegisterRequestBody,
  LoginCredentials,
} from '../../services/user/usertypes';
import loginUser from '../../services/user/login';
import { generateAccessTokenByRefreshToken } from '../../services/tokens';
import logoutUser from '../../services/user/logout';
import authorize from '../../middlewares/authorization';
const router = express.Router();

router.post('/', async (req, res) => {
  const requestBody = req.body as RegisterRequestBody;
  const { status, payload } = await registerUser(requestBody);
  if (status === 201 && 'refreshToken' in payload) {
    const { accessToken, refreshToken, ...otherPayloads } = payload;
    res
      .cookie('rt', refreshToken, { httpOnly: true })
      .cookie('at', accessToken, { httpOnly: true });
    res.status(status).json(otherPayloads);
  } else {
    res.status(status).json(payload);
  }
});

router.post('/login', async (req, res) => {
  const requestBody = req.body as LoginCredentials;
  const { status, payload } = await loginUser(requestBody);
  if (status === 200 && 'refreshToken' in payload) {
    const { accessToken, refreshToken, ...otherPayloads } = payload;
    res
      .cookie('rt', refreshToken, { httpOnly: true })
      .cookie('at', accessToken, { httpOnly: true });
    res.status(status).json(otherPayloads);
  } else {
    res.status(status).json(payload);
  }
});

router.post('/validate', async (req, res) => {
  if (!req.cookies['rt']) {
    res.status(403).end();
  } else {
    const { status, payload } = await generateAccessTokenByRefreshToken(
      req.cookies['rt']
    );
    if (status === 200 && 'accessToken' in payload) {
      const { accessToken, refreshToken, ...otherPayload } = payload;
      res.cookie('at', accessToken, { httpOnly: true });
      res.status(status).json(otherPayload);
    } else {
      res.cookie('at', '', { maxAge: 0 });
      res.cookie('rt', '', { maxAge: 0 });
      res.status(status).send(payload);
    }
  }
});

router.post('/logout', async (req, res) => {
  const requestBody = req.body as { username: string };

  const removalProcess = await logoutUser(requestBody.username);
  res.cookie('rt', '', { maxAge: 0 });
  res.cookie('at', '', { maxAge: 0 });
  res.status(removalProcess ? 200 : 500).end();
});

export default router;
