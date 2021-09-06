import CreateLeagueService from '@modules/leagues/services/CreateLeagueService';
import ListLeagueService from '@modules/leagues/services/ListLeaguesService';
import ShowLeagueService from '@modules/leagues/services/ShowLeagueService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class LeagueController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listLeague = container.resolve(ListLeagueService);

		const leagues = await listLeague.execute();

		return res.json(leagues);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { league, league_icon, country } = req.body;

		const createLeague = container.resolve(CreateLeagueService);

		const liga = await createLeague.execute({
			league,
			league_icon,
			country,
		});

		return res.json(liga);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const showLeague = container.resolve(ShowLeagueService);
		const { league } = req.params;

		const liga = await showLeague.execute({ league });

		return res.json(liga);
	}
}
