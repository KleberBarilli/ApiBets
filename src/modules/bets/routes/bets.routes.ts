import { Router } from 'express';
import BetsController from '../controllers/BetsController';
import { celebrate, Joi, Segments } from 'celebrate';

const betsRouter = Router();
const betsController = new BetsController();

betsRouter.get(
	'/user/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	betsController.index,
);

betsRouter.get(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	betsController.show,
);

betsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			user_bet_id: Joi.string().uuid().required(),
			event: Joi.string().required(),
			bookie: Joi.string().required(),
			bet: Joi.string().required(),
			stake: Joi.number().required(),
			odd: Joi.number().required(),
			sport: Joi.string(),
			tag: Joi.string(),
			tipster: Joi.string(),
			status: Joi.string(),
			result: Joi.number(),
			notes: Joi.string(),
		},
	}),
	betsController.create,
);

betsRouter.put(
	'/:id',
	celebrate({
		[Segments.BODY]: {
			user_bet_id: Joi.string().uuid().required(),
			event: Joi.string().required(),
			bookie: Joi.string().required(),
			bet: Joi.string().required(),
			stake: Joi.number().required(),
			odd: Joi.number().required(),
			sport: Joi.string(),
			tag: Joi.string(),
			tipster: Joi.string(),
			status: Joi.string(),
			result: Joi.number(),
			notes: Joi.string(),
		},
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	betsController.update,
);

betsRouter.delete(
	'/:id',
	celebrate({
		[Segments.PARAMS]: {
			id: Joi.string().uuid().required(),
		},
	}),
	betsController.delete,
);

export default betsRouter;
