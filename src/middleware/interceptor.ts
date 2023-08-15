import { NextFunction, Request, Response } from 'express';
import authVerified from '../utils/auth';
import { isPrd } from '../utils';

// 拦截器
const allowedOrigins = ['https://blog.naice.me', 'https://blog.admin.naice.me'];

const interceptor = async (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin || ''; // 表示当前请求资源所在页面的协议和域名，用来说明请求从哪里发起的，如http://test.my.com，

  // 设置请求源
  if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
    res.set('Access-Control-Allow-Origin', origin);
  }

  res.set({
    'Access-Control-Allow-Headers':
      'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Powered-By': 'naice 2.0.0',
  });

  // OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200);
    return false;
  }

  // 如果是生产环境，需要验证用户来源渠道，防止非正常请求
  if (isPrd && !allowOrigin(req)) {
    res.status(403).json({ code: 3, message: '访问被拒绝：来源地址不正确！' });
    return false;
  }

  // 允许网站前端登录的post请求 && 评论的post请求 && like请求 && hero post
  const isAllowRequest = allowRequest(req);
  if (isAllowRequest) {
    await next();
    return false;
  }

  // 拦截所有非管路员的 非get 请求
  if (!authVerified(req) && !Object.is(req.method, 'GET')) {
    res.status(401).json({ code: 3, message: '身份验证失败，请重新登录！' });
    return false;
  }

  await next();
};

const allowRequestOptions = [
  {
    url: '/user/login',
    method: 'POST',
  },
  // {
  //   url: '/article/like',
  //   meth: 'POST'
  // },
  // {
  //   url: '/api/hero/add',
  //   meth: 'POST'
  // },
  // {
  //   url: '/api/comment/add',
  //   meth: 'POST'
  // },
  // {
  //   url: '/api/reply/add',
  //   meth: 'POST'
  // }
];

const allowRequest = (req: Request): boolean =>
  allowRequestOptions.some((item) => req.url.indexOf(item.url) > 0 && Object.is(req.method, item.method));

// 请求来源
const allowOrigin = (req: Request): boolean => {
  const origin = req.headers.origin || ''; // 表示当前请求资源所在页面的协议和域名，用来说明请求从哪里发起的，如http://test.my.com，
  const referer = req.headers.referer || ''; // 表示当前请求资源所在页面的完整路径：协议+域名+查询参数（注意不包含锚点信息)
  return allowedOrigins.some((item) => item.includes(origin) || item.includes(referer));
};

export default interceptor;
