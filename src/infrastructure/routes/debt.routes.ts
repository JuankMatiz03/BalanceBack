import { Router } from 'express';
import { authMiddleware } from '@middlewares/debtauth.middleware';
import { DebtController } from '@controllers/debt/DebtController.controller';

const router = Router();

router.use(authMiddleware);

router.post('/', DebtController.create);
router.get('/', DebtController.list);
router.put('/:id', DebtController.update);
router.delete('/:id', DebtController.delete);
router.post('/:id/pay', DebtController.pay);
router.get('/export/:format', DebtController.export);
router.get('/aggregates', DebtController.aggregates);

export default router;
