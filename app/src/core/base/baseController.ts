import { Response } from 'express';
import { SERVER_ERROR_CODE } from '../enum';
import { ERROR_STATUS, SERVER_ERROR_STATUS } from '../error';
import ApiError from '../reponse/apiError';

export default class BaseController {
  protected static ErrorResponse = (res: Response, error: any) => {
    const ERROR_CODE = error?.response?.data?.status_code ?? error.code;
    console.log('BaseController ERROR_CODE : ', ERROR_CODE);
    console.trace();
    if (ERROR_CODE) {
      return new ApiError(res, ERROR_STATUS(error)).sendError();
    } else {
      return new ApiError(
        res,
        SERVER_ERROR_STATUS(SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR)
      ).sendError();
    }
  };
}
