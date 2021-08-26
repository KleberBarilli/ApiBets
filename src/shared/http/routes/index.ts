import betsRouter from '@modules/bets/routes/bets.routes';
import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/bets', betsRouter);
routes.use('/users', userRouter);

export default routes;
