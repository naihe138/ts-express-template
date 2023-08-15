import crypto from 'crypto';

/**
 * 在这个示例程序中，首先引入了crypto模块。然后定义了一个要加密的密码变量password，接着使用crypto.randomBytes()生成一个随机的盐，长度为16字节（128位），
 * 使用toString('hex')将其转换为16进制字符串表示。接着使用crypto.createHash()创建一个SHA-256算法的摘要对象，
 * 使用update()方法将密码和盐拼接起来作为输入，最后使用digest('hex')将摘要以16进制字符串形式输出。
 * 需要注意的是，由于SHA-256算法是一种单向哈希算法，因此无法将加密后的密码解密回原始密码。因此在实际应用中，通常是将用户输入的密码与数据库中存储的加密后的密码进行比较来验证密码是否正确。
 * @param password
 * @returns password
 */

export const genPassword = (password: string): string => {
  return crypto
    .createHash('sha256')
    .update(getEnv('USER_PASSWORD_SALT') + password)
    .digest('hex');
};

export const getEnv = (key: keyof IEnv): string => {
  return process.env[key] as string;
};

export const isDev = getEnv('APP_ENV') === 'dev';
export const isPrd = getEnv('APP_ENV') === 'prd';
