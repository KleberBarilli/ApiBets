import betsRouter from '@modules/bets/routes/bets.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/bets', betsRouter);

export default routes;
