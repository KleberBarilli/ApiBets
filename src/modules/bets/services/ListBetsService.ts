import { inject, injectable } from 'tsyringe';
import BetsRepository from '../infra/typeorm/repositories/BetsRepository';
import RedisCache from '@shared/cache/RedisCache';
import { IPaginateBet } from '@modules/bets/domain/models/IPaginateBet';

@injectable()
export default class ListBetsService {
	constructor(
		@inject('BetsRepository') private betsRepository: BetsRepository,
	) {}

	async execute(user_id: string): Promise<IPaginateBet | null> {
		let bets = await RedisCache.recover<IPaginateBet>(
			`user-bets-${user_id}`,
		);

		if (!bets) {
			const bets = await this.betsRepository.findAllPaginate(user_id);

			await RedisCache.save(`user-bets-${user_id}`, bets);
		}

		return bets;
	}
}
