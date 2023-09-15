import { Router } from 'express';
import OpenApiNiceController from '../../../controller/standard/openapi/nice.controller';
import { body, param, query } from 'express-validator';
import { validatorErrorChecker } from '../../../middleware/validation';

const router = Router();

router.post(
  '/nice/pass-key',
  body('token_version_id').notEmpty().isString(),
  body('value').notEmpty().isObject(),
  body('value.key').notEmpty().isString(),
  body('value.iv').notEmpty().isString(),
  body('value.req_no').notEmpty().isString(),
  validatorErrorChecker,
  OpenApiNiceController.setNicePassKey
);

router.get(
  '/nice/pass-key',
  query('token_version_id').notEmpty().isString(),
  validatorErrorChecker,
  OpenApiNiceController.getNicePassKey
);

router.post(
  '/nice/user-info',
  body('token_version_id').notEmpty().isString(),
  body('value').notEmpty().isObject(),
  body('value.resultcode').notEmpty().isString(),
  body('value.responseno').notEmpty().isString(),
  body('value.enctime').notEmpty().isString(),
  body('value.sitecode').notEmpty().isString(),
  body('value.requestno').optional().isString(),
  body('value.authtype').optional().isString(),
  body('value.name').optional().isString(),
  body('value.utf8_name').optional().isString(),
  body('value.birthdate').optional().isString(),
  body('value.gender').optional().isString(),
  body('value.nationalinfo').optional().isString(),
  body('value.mobileco').optional().isString(),
  body('value.mobileno').optional().isString(),
  body('value.ci').optional().isString(),
  body('value.di').optional().isString(),
  body('value.businessno').optional().isString(),
  body('value.receivedata').optional().isString(),
  validatorErrorChecker,
  OpenApiNiceController.setNiceUserInfo
);

router.get(
  '/nice/user-info',
  query('token_version_id').notEmpty().isString(),
  validatorErrorChecker,
  OpenApiNiceController.getNiceUserInfo
);

export default router;
