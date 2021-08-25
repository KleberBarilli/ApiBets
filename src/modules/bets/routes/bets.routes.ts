import { Router } from 'express';
import BetsController from '../controllers/BetsController';

const betsRouter = Router();
const betsController = new BetsController();

betsRouter.get('/user/:id', betsController.index);
betsRouter.get('/:id', betsController.show);
betsRouter.post('/', betsController.create);
betsRouter.put('/:id', betsController.update);
betsRouter.delete('/:id', betsController.delete);

export default betsRouter;
