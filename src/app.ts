import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import UserAPI from './routes/apis/users';
import bodyParser from 'body-parser';
import initialize from './models/initializer'
import cookieParser from 'cookie-parser';
import User from './models/User';

declare global {
  namespace Express {
    interface Request {
      userData: User;
    }
  }
}

const app = express();

app.use(function(req, res, next) {  
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});  
app.use(cors({origin: true, credentials: true}), bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/users', UserAPI);

initialize()
export default app;
