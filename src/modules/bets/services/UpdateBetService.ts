import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bet from '../typeorm/entities/Bet';
import BetsRepository from '../typeorm/repositories/BetsRepository';

interface IRequest {
	id: string;
	user_bet_id: string;
	event: string;
	bookie: string;
	bet: string;
	stake: number;
	odd: number;
	sport: string;
	tag: string;
	tipster: string;
	status: string;
	result: number;
	notes: string;
	date: Date;
}

export default class UpdateBetService {
	async execute({
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
	}: IRequest): Promise<Bet> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const selection = await betsRepositories.findOne(id);

		if (!selection) {
			throw new AppError('Bet Not found');
		}

		selection.user_bet_id = user_bet_id;
		selection.event = event;
		selection.bookie = bookie;
		selection.bet = bet;
		selection.stake = stake;
		selection.odd = odd;
		selection.sport = sport;
		selection.tag = tag;
		selection.tipster = tipster;
		selection.status = status;
		selection.result = result;
		selection.notes = notes;
		selection.date = date;

		await betsRepositories.save(selection);

		return selection;
	}
}
