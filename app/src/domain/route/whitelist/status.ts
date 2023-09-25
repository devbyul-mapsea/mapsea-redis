import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('개발 진행 중');
});

export default router;
