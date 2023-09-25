import { IMiddleware } from '../../core/interface/IExpress';
import ApiError from '../../core/reponse/apiError';
import { AUTH_ERROR_CODE } from '../../core/enum';
import { AUTH_ERROR_STATUS } from '../../core/error';
import { Request } from 'express';

/**
 * TODO: 추후 접근에 대한 화이트 리스트는 DB로 작업을 진행해야 합니다.
 * 개발자 권한 체크는 ip 화이트 리스트를 만들어 관리할 것입니다.
 * 화이트 리스트에 작성되지 않은 ip 일 경우 AUTH_FORRBIDDEN 에러를 발생 시킵니다.
 */
const ipWitheList = ['127.0.0.1'];

const getClientIpAddress = (req: Request) => {
  const clientIp = req.ip;

  return clientIp;
};

const developerAuthorizeChecker: IMiddleware = (req, res, next) => {
  const ipAddress = req.socket.remoteAddress?.split('::ffff:')[1] || '';

  if (!ipWitheList.includes(ipAddress)) {
    return new ApiError(
      res,
      AUTH_ERROR_STATUS(AUTH_ERROR_CODE.AUTH_FORBIDDEN)
    ).sendError();
  }

  next();
};

/**
 * 프록시서버에서 사용 중인 open api 를 사용 할 수 있는 화이트 리스트를 조회하여 사용 권한을 확인 합니다.
 */
const openApiServiceAuthorizeChecker: IMiddleware = (req, res, next) => {
  const clientIp = getClientIpAddress(req);
  console.log('clientIp : ', clientIp);
};

export { developerAuthorizeChecker, openApiServiceAuthorizeChecker };
