import { Router } from 'express';
import NodeStatusRouter from './node';

import { developerAuthorizeChecker } from '../../middleware/authorize';

const router = Router();

router.use(developerAuthorizeChecker);

router.use(NodeStatusRouter);

export default router;
