import { Express } from 'express-serve-static-core';
import cors from 'cors';
import express from 'express';
// @ts-ignore
import helmet from 'helmet';
import bodyParser from 'body-parser';
// import interceptor from './interceptor';

const middleware = (app: Express) => {
  app.use(async (req, _res, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${ms}ms`);
  });

  app.use(express.static('public'));
  // middleware
  // 跨域
  app.use(
    cors({
      origin: true,
      // origin: '*',
    }),
  );

  // express-rate-limit 防止同一个ip多次请求

  // 日志
  // https://www.npmjs.com/package/winston
  // https://juejin.cn/post/7018169629176496158  Node.js 日志之winston使用指南
  // https://www.51cto.com/article/741987.html

  // app.use(interceptor);
  app.use(helmet());
  app.use(
    bodyParser.json({
      limit: '10mb',
    }),
  );
};

export default middleware;
