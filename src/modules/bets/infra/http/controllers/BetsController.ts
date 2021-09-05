import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowBetService from '@modules/bets/services/ListBetService';
import ListBetsService from '@modules/bets/services/ListBetsService';
import CreateBetService from '@modules/bets/services/CreateBetService';
import UpdateBetService from '@modules/bets/services/UpdateBetService';
import DeleteBetService from '@modules/bets/services/DeleteBetService';

export default class BetsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listBets = container.resolve(ListBetsService);
		const { id } = req.params;

		const bets = await listBets.execute(id);

		return res.json(bets);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showBet = container.resolve(ShowBetService);

		const bet = await showBet.execute({ id });

		return res.json(bet);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const {
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		} = req.body;

		const createBet = container.resolve(CreateBetService);

		const selection = await createBet.execute({
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		});

		return res.json(selection);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const {
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		} = req.body;

		const { id } = req.params;

		const updateBet = container.resolve(UpdateBetService);

		const selection = await updateBet.execute({
			id,
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		});

		return res.json(selection);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteBet = container.resolve(DeleteBetService);

		await deleteBet.execute({ id });

		return res.json([]);
	}
}
