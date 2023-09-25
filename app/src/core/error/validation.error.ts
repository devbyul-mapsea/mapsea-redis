import { StatusCodes } from 'http-status-codes';
import {
  IValidationErrorStatus,
  ValidationErrorCustomMsg,
} from '../interface/IError';
import { Result } from 'express-validator';
import { SERVER_ERROR_STATUS } from './server.error';
import { SERVER_ERROR_CODE } from '../enum';

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

/**
 * validation 에러 발생할 경우 기존 포맷팅에서 { location, value, msg } 으로 포맷팅 합니다.
 * @returns ValidationErrorCustomMsg
 */
const validationErrorFormat = (
  validation: Result<any>
): ValidationErrorCustomMsg => {
  const formatWithResult = validation.formatWith((error: any) => {
    const { location, value, msg } = error;
    return { location, value, msg };
  });

  return formatWithResult.mapped();
};

const VALIDATION_ERROR: IValidationErrorStatus = {
  VALIDATION_FAIL: (validation: Result<any>) => {
    return {
      code: 'VALIDATION_FAIL',
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Validation fail, entered data is incorrect.',
      validation: validationErrorFormat(validation),
    };
  },
};

export const VALIDATION_ERROR_STATUS = (
  code: string,
  validation: Result<any>
) => {
  try {
    return VALIDATION_ERROR[code](validation);
  } catch (error) {
    return SERVER_ERROR_STATUS(SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
};
