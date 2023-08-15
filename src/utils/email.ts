import nodemailer from 'nodemailer';
import { getEnv } from './index';

let clientIsValid = false;

const transporter = nodemailer.createTransport({
  service: getEnv('EMAIL_SERVICE'),
  secure: true,
  // secureConnection: true,
  port: 465,
  auth: {
    user: getEnv('EMAIL_ACCOUNT'),
    pass: getEnv('EMAIL_PASSWORD'),
  },
});

export const verifyEmailClient = () => {
  transporter.verify((error) => {
    if (error) {
      clientIsValid = false;
      console.warn('邮件客户端初始化连接失败，请检查代码');
      console.warn(error);
    } else {
      clientIsValid = true;
      console.log('邮件客户端初始化连接成功，随时可发送邮件');
    }
  });
};

export const sendMail = (mailOptions) => {
  if (!clientIsValid) {
    console.warn('由于未初始化成功，邮件客户端发送被拒绝');
    return false;
  }
  mailOptions.from = '"何文林" <370215230@qq.com>';
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.warn('邮件发送失败', error);
    console.log('邮件发送成功', info.messageId, info.response);
  });
};
