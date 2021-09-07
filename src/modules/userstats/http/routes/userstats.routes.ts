import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserStatsController from '../controllers/UserStatsController';

const userStatsRouter = Router();
const userStatsController = new UserStatsController();

userStatsRouter.get(
	'/:username',
	celebrate({
		[Segments.PARAMS]: {
			username: Joi.string().required(),
		},
	}),
	userStatsController.show,
);

userStatsRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			total_bets: Joi.number().required(),
			total_stake: Joi.number().required(),
			profit: Joi.number().required(),
			avg_odds: Joi.number().required(),
			roi: Joi.number().required(),
		},
	}),
	userStatsController.create,
);

userStatsRouter.put(
	'/:username',
	celebrate({
		[Segments.BODY]: {
			username: Joi.string().required(),
			total_bets: Joi.number().required(),
			total_stake: Joi.number().required(),
			profit: Joi.number().required(),
			avg_odds: Joi.number().required(),
			roi: Joi.number().required(),
		},
		[Segments.PARAMS]: {
			username: Joi.string().required(),
		},
	}),
	userStatsController.update,
);

export default userStatsRouter;
