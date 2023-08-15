import path from 'path';
import fs from 'fs';
import busboy from 'busboy';
import qiniu from 'qiniu';
import { getEnv } from '.';
import { Request } from 'express';
// 写入目录
const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
  return false;
};

// 获取文件后缀名
function getSuffix(fileName) {
  return fileName.split('.').pop();
}

// 重命名
function Rename(fileName) {
  return Math.random().toString(32).substring(4) + '.' + getSuffix(fileName);
}
// 删除文件
export const removeTemFile = (p) => {
  fs.unlink(p, (err) => {
    if (err) {
      throw err;
    }
  });
};

interface IUploadOption {
  fileType: string;
  path: string;
}

// 上传到本地服务器
export const uploadFile = (req: Request, options: IUploadOption) => {
  const emmiter = busboy({ headers: req.headers });
  const fileType = options.fileType;
  const filePath = path.join(options.path, fileType);
  // 写入目录
  const confirm = mkdirSync(filePath);
  if (!confirm) {
    return;
  }
  console.log('start uploading...');
  return new Promise((resolve, reject) => {
    emmiter.on('file', (_fieldName, file, fileObj) => {
      const fileName = Rename(fileObj.filename);
      const saveTo = path.join(path.join(filePath, fileName));
      file.pipe(fs.createWriteStream(saveTo));
      file.on('end', () => {
        resolve({
          imgPath: `/${fileType}/${fileName}`,
          imgKey: fileName,
        });
      });
    });

    emmiter.on('finish', () => {
      console.log('finished...');
    });

    emmiter.on('error', (err) => {
      console.log('err...');
      reject(err);
    });
    req.pipe(emmiter);
  });
};

// 上传到七牛
export const upToQiniu = (filePath, key) => {
  const accessKey = getEnv('QI_NIU_ACCESS_KEY');
  const secretKey = getEnv('QI_NIU_SECRET_KEY');
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: getEnv('QI_NIU_BUCKET'),
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const config: any = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2;
  const localFile = filePath;
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody) => {
      if (respErr) {
        reject(respErr);
      } else {
        resolved(respBody);
      }
    });
  });
};
