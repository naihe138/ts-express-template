import { createClient } from 'redis';
import { getEnv } from '../utils';
export const redisClient = createClient({
  port: Number(getEnv('REDIS_PORT')),
  password: getEnv('REDIS_PASSWORD'),
} as any);

// 连接到Redis服务器
redisClient.on('connect', async () => {
  console.log('已连接到Redis服务器');
});

// 处理连接错误
redisClient.on('error', (err) => {
  console.error('无法连接到Redis服务器:', err);
});
