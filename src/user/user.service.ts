import express from 'express';
import jwt from 'jsonwebtoken';
import { resError, resSuccess } from '../utils/resHandle';
import { findOne, getUserInfo } from './user.controller';
import { genPassword, getEnv } from '../utils';
import verifyParams from '../middleware/verifyParams';
import verifyCode from '../middleware/verifyCode';

const userService = express.Router();

const tokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7天

userService.post('/login', verifyCode(), verifyParams(['username', 'password']), async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findOne(username);
    if (user) {
      if (user.password === genPassword(password)) {
        const token = jwt.sign(
          {
            userId: user._id,
            exp: tokenExp,
          },
          getEnv('USER_JWT_SECRET'),
        );
        resSuccess(res, { token, exp: tokenExp }, '登陆成功');
      } else {
        resError(res, {}, '密码错误!');
      }
    } else {
      resError(res, {}, '账户不存在');
    }
  } catch (err) {
    resError(res, err);
  }
});

userService.post('/info', async (req, res) => {
  const user = await getUserInfo(req.userId);
  if (user) {
    resSuccess(res, user);
  } else {
    resError(res, null);
  }
});

export default userService;
