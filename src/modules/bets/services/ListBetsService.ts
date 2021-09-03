import { getCustomRepository } from 'typeorm';
import Bet from '../infra/typeorm/entities/Bet';
import BetsRepository from '../infra/typeorm/repositories/BetsRepository';
import RedisCache from '@shared/cache/RedisCache';

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

		let bets = await RedisCache.recover<IPaginateBets>(
			`user-bets-${user_id}`,
		);

		if (!bets) {
			const bets = await betsRepositories
				.createQueryBuilder()
				.where({
					user_bet_id: user_id,
				})
				.orderBy({
					date: 'DESC',
				})
				.paginate();

			await RedisCache.save(`user-bets-${user_id}`, bets);
		}

		return bets as IPaginateBets;
	}
}
