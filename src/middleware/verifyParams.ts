import { NextFunction, Request, Response } from 'express';
// 参数校验中间件
const verifyParams = (params: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  if (params && params.length > 0) {
    const errors: string[] = [];
    params.forEach((k) => {
      if (!req.body.hasOwnProperty(k)) {
        errors.push(k);
      }
    });
    if (errors.length > 0) {
      res.status(412).json({ code: 2, message: `${errors.join(', ')} 参数缺失`, error: null });
    }
  }
  await next();
};

export default verifyParams;
