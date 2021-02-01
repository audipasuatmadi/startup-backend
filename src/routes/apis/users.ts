import express from 'express'
import registerUser from '../../services/user/register';
import { RegisterRequestBody } from '../../services/user/usertypes';
const router = express.Router()

router.post('/', async (req, res) => {
  const requestBody = req.body as RegisterRequestBody
  const result = await registerUser(requestBody)
  res.status(result.status).json(result.payload)
})

export default router