import { Router } from 'express';

import { body, query } from 'express-validator';
import { validatorErrorChecker } from '../../../../middleware/validation';

import MapseaApiController from '../../../../controller/standard/mapsea/mapsea.controller';

const router = Router();

router.post(
  '/auth/general/reset-pwd-key',
  body('email_hash').notEmpty().isString(),
  body('value').notEmpty().isObject(),
  body('value.key').notEmpty().isString(),
  body('value.iv').notEmpty().isString(),
  body('value.encrypted').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.setUserRestPwdKey
);

router.get(
  '/auth/general/reset-pwd-key',
  query('key').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.getUserRestPwdKey
);

router.post(
  '/auth/company/reset-pwd-key',
  body('email_hash').notEmpty().isString(),
  body('value').notEmpty().isObject(),
  body('value.key').notEmpty().isString(),
  body('value.iv').notEmpty().isString(),
  body('value.encrypted').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.setCompanyRestPwdKey
);

router.get(
  '/auth/company/reset-pwd-key',
  query('key').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.getCompanyRestPwdKey
);

export default router;
