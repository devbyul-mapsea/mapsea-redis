import { StatusCodes } from 'http-status-codes';

import ApiError from '../../../core/reponse/apiError';
import ApiResponse from '../../../core/reponse/apiResponse';
import { IController } from '../../../core/interface';
import { SERVER_ERROR_CODE } from '../../../core/enum';
import { SERVER_ERROR_STATUS } from '../../../core/error';

export default class statusController {
  static nodeHealth: IController = async (req, res) => {
    try {
      const data = {
        updatime: process.uptime(),
        message: 'OK',
      };

      ApiResponse.result(res, StatusCodes.OK, data);
    } catch (error: any) {
      new ApiError(
        res,
        SERVER_ERROR_STATUS(SERVER_ERROR_CODE.INTERNAL_SERVER_ERROR)
      ).sendError();
    }
  };
}
