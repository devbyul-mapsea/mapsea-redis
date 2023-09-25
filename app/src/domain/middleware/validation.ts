import { Result, validationResult } from 'express-validator';

import { IMiddleware } from '../../core/interface';
import ApiError from '../../core/reponse/apiError';
import { VALIDATION_ERROR_STATUS } from '../../core/error';
import { VALIDATION_ERROR_CODE } from '../../core/enum';

/**
 * Request 측에서 전달받은 body, param, queryString 값이 유효성 검사 이후 해당 미들웨어를 호출합니다.
 * validationResult 값 중 error 가 발생하지 않을 경우 next 함수로 다음 서비스 로직으로 넘어 갑니다.
 * 에러가 발생 할 경우 {@link VALIDATION_ERROR_STATUS}에 의해 에러 객체를 생성 합니다.
 *
 */
const validatorErrorChecker: IMiddleware = (req, res, next) => {
  const result: Result = validationResult(req);

  if (!result.isEmpty()) {
    return new ApiError(
      res,
      VALIDATION_ERROR_STATUS(VALIDATION_ERROR_CODE.VALIDATION_FAIL, result)
    ).sendError();
  }

  next();
};

export { validatorErrorChecker };
