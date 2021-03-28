import express from 'express'
import registerUser from '../../services/user/register';
import { RegisterRequestBody, LoginCredentials, AuthenticationTokens } from '../../services/user/usertypes';
import loginUser from '../../services/user/login';
const router = express.Router()

router.post('/', async (req, res) => {
  const requestBody = req.body as RegisterRequestBody
  const result = await registerUser(requestBody)
  res.status(result.status).json(result.payload)
})

router.post('/login', async (req, res) => {
  const requestBody = req.body as LoginCredentials
  const result = await loginUser(requestBody)
  res.status(result.status).json(result.payload)
})

router.post('/validate', async(req, res) => {
  const requestBody = req.body as AuthenticationTokens
  
})

export default router