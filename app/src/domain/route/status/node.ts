import { Router } from 'express';
const statusMonitor = require('express-status-monitor')();

import statusController from '../../controller/status/statusController';

const router = Router();

router.use(statusMonitor);

router.get('/node/health', statusController.nodeHealth);
router.get('/node/monitor', statusMonitor.pageRoute);

export default router;
