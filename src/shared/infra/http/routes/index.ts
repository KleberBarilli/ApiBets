import betsRouter from '@modules/bets/infra/http/routes/bets.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import leaguesRouter from '@modules/leagues/infra/http/routes/leagues.routes';

const routes = Router();

routes.use('/bets', betsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/leagues', leaguesRouter);

export default routes;
