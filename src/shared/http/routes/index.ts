import betsRouter from '@modules/bets/routes/bets.routes';
import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/bets', betsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
