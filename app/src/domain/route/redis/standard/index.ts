import { Router } from 'express';

import MapseaRouter from './mapsea/index';
import NiceRouter from './nice/index';

const router = Router();

router.use('/mapsea', MapseaRouter);
router.use('/nice', NiceRouter);

export default router;
