import mongoose from 'mongoose';
import { genPassword, getEnv } from '../utils';
import { findOne, signUp } from '../user/user.controller';

const openDebugger = process.env.MODE !== 'prd';

mongoose.set('debug', openDebugger);

function connect() {
  mongoose.connect(getEnv('MONGODB_RUL'));
  // 连接错误
  mongoose.connection.on('error', (error) => {
    console.log('数据库连接失败!', error);
  });

  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!');
    // 初始化管理员
    initAdmin();
  });

  return mongoose;
}

const initAdmin = async () => {
  const username = getEnv('USER_ADMIN_NAME');
  const password = genPassword(getEnv('USER_ADMIN_PASSWORD'));
  const result = (await findOne(username)) as any;
  console.log(result);
  if (!result || result.length === 0) {
    const user = await signUp({
      username,
      password,
      role: 100,
    });
    await user.save().catch((err) => {
      console.log(500, '服务器内部错误-存储admin错误！', err);
    });
  }
};

export default connect;
