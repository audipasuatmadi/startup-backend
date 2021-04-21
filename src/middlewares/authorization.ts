import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { generateAccessTokenByRefreshToken } from "../services/tokens";
import { LoginSuccessResponse } from "../services/user/usertypes";
import UserRepository from "../repositories/UserRepository";

interface HasUsername {
  username: string;
}

const isLoginSuccessResponse = (obj: any): obj is LoginSuccessResponse => {
  if ('accessToken' in obj && 'refreshToken' in obj) return true;
  return false;
}

const isHasUsername = (obj: any): obj is HasUsername => {
  if ('username' in obj) return true;
  return false;
}

const authorize = async (req: Request<{userData: any}>, res: Response, next: NextFunction) => {
  if (req.cookies['rt'] !== null) {
    const accessToken = req.cookies['at'];
    const refreshToken = req.cookies['rt'];

    let atVerifyStatus: string | object | boolean;
    try {
      atVerifyStatus = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
      if (atVerifyStatus === null)
        throw new Error('access token not valid');
    } catch (e) {
      atVerifyStatus = false;
    };
    
    if (atVerifyStatus !== false) {
      if (isHasUsername(atVerifyStatus)) {
        const user = await UserRepository.getUserByUsername(atVerifyStatus.username)
        if (user !== null) {
          req.userData = user;
          next();
        } else {
          console.log(1)
          res.status(403).end();
        }
      } else {
        console.log(2)
        res.status(403).end();
      }
    } else {
      let newAccessToken: string | object | boolean;
      try {
        const newAt =  await generateAccessTokenByRefreshToken(refreshToken);
        if ('otherMessage' in newAt)
          throw new Error('problem in generating new accessToken');
        newAccessToken = newAt.payload;
      } catch (e) {
        newAccessToken = false;
      }

      if (newAccessToken === false) {
        console.log(3)
        res.cookie('at', '', {maxAge: 0});
        res.cookie('rt', '', {maxAge: 0});
        res.status(403).end();
      }

      if (isLoginSuccessResponse(newAccessToken)) {
        const {username} = newAccessToken
        res.cookie('at', newAccessToken.accessToken);
        const user = await UserRepository.getUserByUsername(username);
        if (user !== null) {
          req.userData = user;
          next();
        } else {
          console.log(4)
          res.status(403).end();
        }
      } else {
        console.log(5)
        res.status(403).end();
      }
    }
  } else {
    console.log(6)
    res.status(403).end();
  }
}

export default authorize;