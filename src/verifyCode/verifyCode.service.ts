import express from 'express';
import svgCaptcha from 'svg-captcha';
import { v4 as uuidv4 } from 'uuid';
import { resError, resSuccess } from '../utils/resHandle';
import { redisClient } from '../redis';
const router = express.Router();

// 验证码校验
router.get(`/`, async (_req, res) => {
  const captcha = svgCaptcha.createMathExpr({
    size: 10,
    noise: 2,
    color: true,
    background: '#e6fffb',
  });
  const uuid = uuidv4();

  await redisClient.set(uuid, captcha.text, {
    EX: 120, // TODO: 修改
  });
  console.log('captcha.text: ', captcha.text);
  try {
    resSuccess(
      res,
      {
        img: captcha.data,
        uuid,
      },
      '获取验证码成功成功',
    );
  } catch (err) {
    resError(res, err, '获取验证码失败');
  }
});

const verifyCodeService = router;

export default verifyCodeService;
