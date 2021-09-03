import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import BetsRepository from '../typeorm/repositories/BetsRepository';

interface IRequest {
	id: string;
}

export default class DeleteBetService {
	async execute({ id }: IRequest): Promise<void> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const bet = await betsRepositories.findOne(id);

		if (!bet) {
			throw new AppError('Bet Not found');
		}

		await RedisCache.invalidate(`user-bets-${bet.user_bet_id}`);

		await betsRepositories.remove(bet);
	}
}
