import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LeagueController from '../controllers/LeagueController';

const leaguesRouter = Router();
const leagueController = new LeagueController();

leaguesRouter.get('/', leagueController.index);

leaguesRouter.get('/:league', leagueController.show);

leaguesRouter.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			league: Joi.string().required(),
			league_icon: Joi.string().required(),
			country: Joi.string().required(),
		},
	}),

	leagueController.create,
);

export default leaguesRouter;
