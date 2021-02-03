import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import UserAPI from './routes/apis/users';
import bodyParser from 'body-parser';
import initialize from './models/initializer'


const app = express();

app.use(cors(), bodyParser.json());
app.use('/api/users', UserAPI);

initialize()
export default app;
