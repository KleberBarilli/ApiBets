import { getCustomRepository } from 'typeorm';
import Bet from '../typeorm/entities/Bet';
import BetsRepository from '../typeorm/repositories/BetsRepository';

interface IPaginateBets {
	from: number;
	to: number;
	per_page: number;
	total: number;
	current_page: number;
	prev_page: number | null;
	next_page: number | null;
	data: Bet[];
}

export default class ListBetsService {
	async execute(user_id: string): Promise<IPaginateBets> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const bets = await betsRepositories
			.createQueryBuilder()
			.where({
				user_bet_id: user_id,
			})
			.orderBy({
				date: 'DESC',
			})
			.paginate();

		return bets as IPaginateBets;
	}
}
