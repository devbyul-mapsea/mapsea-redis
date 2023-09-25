import { StatusCodes } from 'http-status-codes';
import { IErrorStatus, IRedisErrorStatus } from '../interface';
import { SERVER_ERROR_STATUS } from './server.error';
import { REDIS_ERROR_CODE, SERVER_ERROR_CODE } from '../enum';

/**
 * 40X - Client Side Error
 * 50X - Server Side Error
 */

/**
 * [ HTTP Status Code ]
 *
 * BAD_REQUEST = 400
 * UNAUTHORIZED = 401
 * PAYMENT_REQUIRED = 402
 * FORBIDDEN = 403
 * NOT_FOUND = 404
 * METHOD_NOT_ALLOWED = 405
 * NOT_ACCEPTABLE = 406
 * PROXY_AUTHENTICATION_REQUIRED = 407
 * REQUEST_TIMEOUT = 408
 * CONFLICT = 409
 *
 * INTERNAL_SERVER_ERROR = 500
 * NOT_IMPLEMENTED = 501
 * BAD_GATEWAY = 502
 * SERVICE_UNAVAILABLE = 503
 * GATEWAY_TIMEOUT = 504
 * HTTP_VERSION_NOT_SUPPORTED = 505
 * INSUFFICIENT_STORAGE = 507
 * NETWORK_AUTHENTICATION_REQUIRED = 511
 */

const REDIS_ERROR: IRedisErrorStatus = {
  DUPLICATE_KEY_ERROR: ({ message, data }) => {
    return {
      code: REDIS_ERROR_CODE.DUPLICATE_KEY_ERROR,
      statusCode: StatusCodes.BAD_REQUEST,
      message,
      data,
    };
  },
  INSERTION_FAILED_ERROR: ({ message, data }) => {
    return {
      code: REDIS_ERROR_CODE.INSERTION_FAILED_ERROR,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      data,
    };
  },
  DATA_NOT_FOUND_ERROR: ({ message, data }) => {
    return {
      code: REDIS_ERROR_CODE.DATA_NOT_FOUND_ERROR,
      statusCode: StatusCodes.BAD_REQUEST,
      message,
      data,
    };
  },
};

export const REDIS_ERROR_STATUS = (error: any) => {
  try {
    const { code, message, data } = error;
    return REDIS_ERROR[code]({ message, data });
  } catch (error) {
    return SERVER_ERROR_STATUS(SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
};
