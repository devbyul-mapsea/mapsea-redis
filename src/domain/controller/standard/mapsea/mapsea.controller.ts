import { StatusCodes } from 'http-status-codes';
import BaseController from '../../../../core/base/baseController';
import ApiResponse from '../../../../core/reponse/apiResponse';
import { IController } from '../../../../core/interface';
import { OpenApiNiceService } from '../../../service/standard/openapi/nice.service';
import qs from 'qs';
import { MapseaApiService } from '../../../service/standard/mapsea/mapsea.service';

export default class MapseaApiController extends BaseController {
  static setUserRestPwdKey: IController = async (req, res) => {
    try {
      const { email_hash: key, value } = req.body;

      const setUserRestPwdKeyParam = { key, value };
      await MapseaApiService.setUserRestPwdKey(setUserRestPwdKeyParam);

      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getUserRestPwdKey: IController = async (req, res) => {
    try {
      const { key }: any = req.query;

      const getUserRestPwdKeyParam = { key };
      const result = await MapseaApiService.getUserRestPwdKey(
        getUserRestPwdKeyParam
      );

      ApiResponse.result(res, StatusCodes.OK, result);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static setCompanyRestPwdKey: IController = async (req, res) => {
    try {
      const { email_hash: key, value } = req.body;

      const setCompanyRestPwdKeyParam = { key, value };
      await MapseaApiService.setCompanyRestPwdKey(setCompanyRestPwdKeyParam);

      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getCompanyRestPwdKey: IController = async (req, res) => {
    try {
      const { key }: any = req.query;

      const getCompanyRestPwdKeyParam = { key };
      const result = await MapseaApiService.getCompanyRestPwdKey(
        getCompanyRestPwdKeyParam
      );

      ApiResponse.result(res, StatusCodes.OK, result);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
}
