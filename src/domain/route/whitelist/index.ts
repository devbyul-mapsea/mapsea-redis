import { Router } from 'express';
import OpenApiWhiteListRouter from './openApi';
import StatusWhiteListRouter from './status';

const router = Router();

router.use(OpenApiWhiteListRouter);
router.use(StatusWhiteListRouter);

export default router;
