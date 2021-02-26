import express from 'express'
import registerUser from '../../services/user/register';
import { RegisterRequestBody, LoginCredentials } from '../../services/user/usertypes';
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
  console.log('returning result');
  console.log(result.status)
  console.log(result.payload)
  res.status(result.status).json(result.payload)
})

export default router