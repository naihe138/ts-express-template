import express from 'express';
// import connect from './mongodb';
import middleware from './middleware';
// import { redisClient } from './redis';
// import { verifyEmailClient } from './utils/email';
// import userService from './user/user.service';
// import tagService from './tags/tag.service';
// import verifyCodeService from './verifyCode/verifyCode.service';
import testService from './test/test.service';
import { getEnv } from './utils';

const app = express();

const port = process.env.APP_PORT;

// 链接mongodb数据库
// connect();

// 链接redis数据库
// redisClient.connect();

// 中间件
middleware(app);

// 校验邮箱系统
// verifyEmailClient();

const prefix = getEnv('APP_API_PATH');
// 路由系统
// app.use(`${prefix}/user`, userService);
// app.use(`${prefix}/tag`, tagService);
// app.use(`${prefix}/verifyCode`, verifyCodeService);
app.use(`${prefix}/test`, testService);
// 404
app.use((_req, res) => {
  res.json({ code: 4, message: '无效的api请求' });
});

// 服务启动
app.listen(port, () => {
  console.log(`博客后端服务已启动: http://localhost:${port}`);
});
