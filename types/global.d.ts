declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_PORT: number;
      NODE_ENV: 'sit' | 'uat' | 'prd';
    }
  }

  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };
  declare interface Window {
    __APP__: App<Element>;
    reportEvent: {
      enterPage: (url: string, query: string) => void;
      init: (config: any) => void;
      reportEvent: (event: string, name: string, params: Recordable, cbSuccess?: Fn, _cbFail?: Fn) => void;
      leavePage: (url: string, query: string) => void;
    };
  }

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement;
  }

  declare interface WheelEvent {
    path?: EventTarget[];
  }

  declare function parseInt(s: string | number, radix?: number): number;

  declare function parseFloat(string: string | number): number;
}

export {};
