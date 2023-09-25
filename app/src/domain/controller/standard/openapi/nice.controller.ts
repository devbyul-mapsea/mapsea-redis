import { StatusCodes } from 'http-status-codes';
import BaseController from '../../../../core/base/baseController';
import ApiResponse from '../../../../core/reponse/apiResponse';
import { IController } from '../../../../core/interface';
import { OpenApiNiceService } from '../../../service/standard/openapi/nice.service';
import qs from 'qs';

export default class OpenApiNiceController extends BaseController {
  static setNicePassKey: IController = async (req, res) => {
    try {
      const { token_version_id: key, value } = req.body;
      console.log({ key, value });
      const setNicePassKeyParam = { key, value };
      await OpenApiNiceService.setNicePassKey(setNicePassKeyParam);

      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getNicePassKey: IController = async (req, res) => {
    try {
      const { token_version_id: key }: any = req.query;
      const getNicePassKeyParam = { key };
      const data = await OpenApiNiceService.getNicePassKey(getNicePassKeyParam);

      ApiResponse.result(res, StatusCodes.OK, data);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static setNiceUserInfo: IController = async (req, res) => {
    try {
      const { token_version_id: key, value } = req.body;
      const setNiceUserInfoParam = { key, value };
      await OpenApiNiceService.setNiceUserInfo(setNiceUserInfoParam);

      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getNiceUserInfo: IController = async (req, res) => {
    try {
      const { token_version_id: key }: any = req.query;
      const getNiceUserInfoParam = { key };
      const data = await OpenApiNiceService.getNiceUserInfo(
        getNiceUserInfoParam
      );

      ApiResponse.result(res, StatusCodes.OK, data);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
}
