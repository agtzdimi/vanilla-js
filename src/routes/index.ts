import { Router } from 'express';
import { balanceUsersAndRedirect } from '../controllers/pricing';
import { redirectAdmins } from '../controllers/redirect';

const router = Router();

router.get('/redirect', redirectAdmins);

router.get('/pricing', balanceUsersAndRedirect);

export default router;
