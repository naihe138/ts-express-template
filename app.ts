// 尽早加载环境变量，这样子可以再全局使用
require('dotenv').config({
  path: `.env.${process.env.MODE || 'dev'}`,
});

import './src/index';
