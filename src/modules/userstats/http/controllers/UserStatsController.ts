import CreateUserStatsService from '@modules/userstats/services/CreateUserStatsService';
import ShowUserStatsService from '@modules/userstats/services/ShowUserStatsService';
import UpdateUserStatsService from '@modules/userstats/services/UpdateUserStatsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserStatsController {
	public async show(req: Request, res: Response): Promise<Response> {
		const { username } = req.params;

		const showUserStatsService = container.resolve(ShowUserStatsService);

		const userStats = await showUserStatsService.execute({ username });

		return res.json(userStats);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { username, total_bets, total_stake, profit, avg_odds, roi } =
			req.body;

		const createUserStats = container.resolve(CreateUserStatsService);

		const userStats = await createUserStats.execute({
			username,
			total_bets,
			total_stake,
			profit,
			avg_odds,
			roi,
		});

		return res.json(userStats);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { total_bets, total_stake, profit, avg_odds, roi } = req.body;

		const { username } = req.params;

		const updateUserStats = container.resolve(UpdateUserStatsService);

		const userStats = await updateUserStats.execute({
			username,
			total_bets,
			total_stake,
			profit,
			avg_odds,
			roi,
		});

		return res.json(userStats);
	}
}
