import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteBet } from '../domain/models/IDeleteBet';
import { IBetsRepository } from '../domain/repositories/IBetsRepository';

@injectable()
export default class DeleteBetService {
	constructor(
		@inject('BetsRepository') private betsRepository: IBetsRepository,
	) {}
	async execute({ id }: IDeleteBet): Promise<void> {
		const bet = await this.betsRepository.findById(id);

		if (!bet) {
			throw new AppError('Bet Not found');
		}

		await RedisCache.invalidate(`user-bets-${bet.user_bet_id}`);

		await this.betsRepository.remove(bet);
	}
}
