import { Router } from 'express';
import OpenApiNiceController from '../../../controller/standard/openapi/nice.controller';
import { body, param } from 'express-validator';
import { validatorErrorChecker } from '../../../middleware/validation';

const router = Router();

router.post(
  '/nice/pass-key',
  body('key').notEmpty().isString(),
  body('value').notEmpty().isObject(),
  body('value.key').notEmpty().isString(),
  body('value.iv').notEmpty().isString(),
  body('value.token_version_id').notEmpty().isString(),
  validatorErrorChecker,
  OpenApiNiceController.setNicePassKey
);
router.get(
  '/nice/pass-key/:integrity_value',
  param('integrity_value').notEmpty().isString(),
  validatorErrorChecker,
  OpenApiNiceController.getNicePassKey
);

export default router;
