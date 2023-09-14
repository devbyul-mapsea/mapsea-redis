import { StatusCodes } from 'http-status-codes';
import BaseController from '../../../../core/base/baseController';
import ApiResponse from '../../../../core/reponse/apiResponse';
import { IController } from '../../../../core/interface';
import { OpenApiNiceService } from '../../../service/standard/openapi/nice.service';

export default class OpenApiNiceController extends BaseController {
  static setNicePassKey: IController = async (req, res) => {
    try {
      const { key, value } = req.body;

      const setNicePassKeyParam = { key, value };
      const result = await OpenApiNiceService.setNicePassKey(
        setNicePassKeyParam
      );

      ApiResponse.result(res, StatusCodes.OK, result);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getNicePassKey: IController = async (req, res) => {
    try {
      const { integrity_value } = req.params;

      const getNicePassKeyParam = { key: integrity_value };
      const result = await OpenApiNiceService.getNicePassKey(
        getNicePassKeyParam
      );

      ApiResponse.result(res, StatusCodes.OK, result);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
}
