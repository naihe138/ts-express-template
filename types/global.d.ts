import mongoose from 'mongoose';

declare global {
  declare interface IEnv {
    APP_PORT: number;
    APP_ENV: 'dev' | 'test' | 'prd';
    APP_API_PATH: string;
    MONGODB_RUL: string;
    USER_JWT_SECRET: string;
    USER_ADMIN_NAME: string;
    USER_ADMIN_PASSWORD: string;
    USER_PASSWORD_SALT: string;
    EMAIL_SERVICE: string;
    EMAIL_ACCOUNT: string;
    EMAIL_PASSWORD: string;
    REDIS_PORT: string;
    REDIS_PASSWORD: string;
    QI_NIU_ACCESS_KEY: string;
    QI_NIU_SECRET_KEY: string;
    QI_NIU_BUCKET: string;
    QI_NIU_ORIGIN: string;
    QI_NIU_UPLOAD_URL: string;
  }

  namespace NodeJS {
    interface ProcessEnv extends IEnv {}
  }

  declare type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;

  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

export {};
