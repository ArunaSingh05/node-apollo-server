import * as express from 'express';

import { UserRouter } from './user-auth.routes';

const router = express.Router();

router.use('/v1/user', UserRouter);

export const allRouters = router;