import User from './user.module';
import { IUser } from './interface/user.interface';

// 注册用户
export const signUp = async (user: IUser) => {
  return await new User(user).save();
};

// 登录接口
export const findOne = async (username: string) => {
  return await User.findOne({ username }).exec();
};

// 获取用户信息
export const getUserInfo = async (id: string) => {
  return await User.findOne({ _id: id }, 'name username slogan gravatar role');
};

// 编辑用户
export const edit = async (opts: IUser) => {
  const { name, username, slogan, avatar, role } = opts;
  const user = await User.findOne({ username }, 'username');
  if (user) {
    const editUser = await User.findByIdAndUpdate(username, { name, slogan, avatar, role }, { new: true });
    if (editUser) {
      return editUser;
    } else {
      return new Error('修改用户资料失败');
    }
  } else {
    return new Error('修改用户资料失败');
  }
};
