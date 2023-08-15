import { Response } from 'express';

// 输出公共解析器
export const resError = (res: Response, err: any = null, message?: string) => {
  res.json({ code: 1, message: message || '请求失败', error: err });
};
export const resSuccess = (res: Response, data: any = null, message?: string) => {
  res.json({ code: 0, message: message || '请求成功', data });
};
