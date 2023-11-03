import { Router } from 'express';

import { body, query } from 'express-validator';
import { validatorErrorChecker } from '../../../../middleware/validation';

import MapseaApiController from '../../../../controller/standard/mapsea/mapsea.controller';

const router = Router();
router.get(
  '/jwt',
  query('rct').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.getRefreshTokenAccessToken
);

router.post(
  '/jwt',
  body('rct').notEmpty().isString(),
  body('act').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.setRefreshTokenAccessToken
);

router.delete(
  '/jwt',
  body('rct').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.deleteRefreshTokenAccessToken
);

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
  MapseaApiController.setCompanyResetPwdKey
);

router.get(
  '/auth/company/reset-pwd-key',
  query('key').notEmpty().isString(),
  validatorErrorChecker,
  MapseaApiController.getCompanyResetPwdKey
);

export default router;
