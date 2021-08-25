import { Request, Response } from 'express';
import ShowBetService from '../services/ListBetService';
import ListBetsService from '../services/ListBetsService';
import CreateBetService from '../services/CreateBetService';
import UpdateBetService from '../services/UpdateBetService';
import DeleteBetService from '../services/DeleteBetService';

export default class BetsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listBets = new ListBetsService();
		const { user_bet_id } = req.params;

		const bets = await listBets.execute(user_bet_id);

		return res.json(bets);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showBet = new ShowBetService();

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
		} = req.body;

		const createBet = new CreateBetService();

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
		} = req.body;

		const { id } = req.params;

		const updateBet = new UpdateBetService();

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
		});

		return res.json(selection);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const deleteBet = new DeleteBetService();

		await deleteBet.execute({ id });

		return res.json([]);
	}
}