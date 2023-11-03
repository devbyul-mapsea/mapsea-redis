import { StatusCodes } from 'http-status-codes';
import BaseController from '../../../../core/base/baseController';
import ApiResponse from '../../../../core/reponse/apiResponse';
import { IController } from '../../../../core/interface';
import { OpenApiNiceService } from '../../../service/standard/openapi/nice.service';
import qs from 'qs';
import { MapseaApiService } from '../../../service/standard/mapsea/mapsea.service';

export default class MapseaApiController extends BaseController {
  static setRefreshTokenAccessToken: IController = async (req, res) => {
    try {
      console.log(req.body);
      const { rct: key, act: value } = req.body;

      const setRefreshTokenAccessTokenParam = { key, value };
      await MapseaApiService.setRefreshTokenAccessToken(
        setRefreshTokenAccessTokenParam
      );
      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
  static getRefreshTokenAccessToken: IController = async (req, res) => {
    try {
      const { rct: key } = req.body;

      const getRefreshTokenAccessTokenParam = { key };
      await MapseaApiService.getRefreshTokenAccessToken(
        getRefreshTokenAccessTokenParam
      );
      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
  static deleteRefreshTokenAccessToken: IController = async (req, res) => {
    try {
      console.log(req.body);
      const { rct: key } = req.body;

      const deleteRefreshTokenAccessTokenParam = { key };
      await MapseaApiService.deleteRefreshTokenAccessToken(
        deleteRefreshTokenAccessTokenParam
      );
      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

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

  static setCompanyResetPwdKey: IController = async (req, res) => {
    try {
      const { email_hash: key, value } = req.body;

      const setCompanyResetPwdKeyParam = { key, value };
      await MapseaApiService.setCompanyResetPwdKey(setCompanyResetPwdKeyParam);

      ApiResponse.result(res, StatusCodes.OK);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };

  static getCompanyResetPwdKey: IController = async (req, res) => {
    try {
      const { key }: any = req.query;

      const getCompanyResetPwdKeyParam = { key };
      const result = await MapseaApiService.getCompanyResetPwdKey(
        getCompanyResetPwdKeyParam
      );

      ApiResponse.result(res, StatusCodes.OK, result);
    } catch (error: any) {
      BaseController.ErrorResponse(res, error);
    }
  };
}
