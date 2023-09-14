import { Router } from 'express';

import standardRouter from './standard/index';

const router = Router();

router.use('/standard/v1', standardRouter);

export default router;
