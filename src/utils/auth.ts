'use strict';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { getEnv } from './index';

/**
 * 判断是否有token
 */
const hasToken = (req: Request) => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (Object.is(parts.length, 2) && Object.is(parts[0], 'Naice')) {
      return parts[1];
    }
  }
  return false;
};

/**
 * 请求用户验证
 * @param req req
 * @returns boolean
 */
const authVerified = (req: Request) => {
  const token = hasToken(req);
  if (token) {
    try {
      const decodedToken = verify(token, getEnv('USER_JWT_SECRET')) as JwtPayload;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const expTime = decodedToken.exp || 0;
      if (expTime > currentTimeInSeconds) {
        req.userId = decodedToken.userId;
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }
  return false;
};

export default authVerified;
