import { AUTH_ERROR_CODE, REDIS_ERROR_CODE } from '../enum';

import { AUTH_ERROR_STATUS } from './auth.error';
import { REDIS_ERROR_STATUS } from './redis.error';

import { SERVER_ERROR_STATUS } from './server.error';

export const ERROR_STATUS = (error: any) => {
  const { code } = error;

  if (code in AUTH_ERROR_CODE) {
    return AUTH_ERROR_STATUS(code);
  }
  if (code in REDIS_ERROR_CODE) {
    return REDIS_ERROR_STATUS(error);
  }

  return SERVER_ERROR_STATUS(code);
};

class ERROR_CODE {
  code: string;
  message?: string;
  sql?: string;
  data?: any;

  constructor() {
    this.code = '';
    this.message = '';
    this.sql = '';
    this.data = {};
  }
}

export class ERROR_CODE_BUILDER {
  private error_code: ERROR_CODE;
  constructor() {
    this.error_code = new ERROR_CODE();
  }

  forCode = (code: string) => {
    this.error_code.code = code;
    return this;
  };

  setMessage = (message: string) => {
    this.error_code.message = message;
    return this;
  };

  setSql = (sql: string) => {
    this.error_code.sql = sql;
    return this;
  };

  setData = (data: any) => {
    this.error_code.data = data;
    return this;
  };

  build = () => {
    return this.error_code;
  };
}
