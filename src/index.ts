import express from 'express';
import { test } from './test';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.MODE || 'sit';

dotenv.config({
  path: path.resolve(__dirname, `../../.env.${env}`), // 因为运行的dist文件夹的内容
});

const app = express();
const port = process.env.SERVER_PORT;

app.get('/', (_req, res) => {
  test();
  res.send('hello world123');
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
