import { StatusCodes } from 'http-status-codes';
import { IErrorStatus } from '../interface';

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

const SERVER_ERROR: IErrorStatus = {
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong on the server.',
  },
};

export const SERVER_ERROR_STATUS = (code: string) => {
  try {
    return SERVER_ERROR[code];
  } catch (error) {
    return SERVER_ERROR.INTERNAL_SERVER_ERROR;
  }
};
