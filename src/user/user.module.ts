// 权限和用户数据模型
import { Schema, model } from 'mongoose';
import { genPassword, getEnv } from '../utils';
import { IUser } from './interface/user.interface';

const userSchema = new Schema<IUser>({
  // 名字
  name: { type: String, default: 'naice' },
  // 用户名
  username: {
    type: String,
    default: getEnv('USER_ADMIN_NAME'),
  },
  // 签名
  slogan: { type: String, default: '' },
  // 头像
  avatar: { type: String, default: '' },
  // 密码
  password: {
    type: String,
    default: genPassword(getEnv('USER_ADMIN_PASSWORD')),
  },
  // 角色权限
  role: { type: Number, default: 1 },
});

const User = model<IUser>('User', userSchema);

export default User;
