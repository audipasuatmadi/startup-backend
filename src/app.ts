import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import UserAPI from './routes/apis/users';
import bodyParser from 'body-parser';

const app = express();

app.use(cors(), bodyParser.json());
app.use('/api/users', UserAPI);

export default app;
