import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../redis';
// 验证码校验中间件
const verifyCode = () => async (req: Request, res: Response, next: NextFunction) => {
  const { uuid, code } = req.body;
  const value = await redisClient.get(uuid);
  if (!value) {
    res.status(200).json({ code: 3, message: '验证码已过期', error: null });
    return;
  } else if (code !== value) {
    res.status(200).json({ code: 3, message: '验证码错误', error: null });
    return;
  } else {
    await next();
  }
};

export default verifyCode;
