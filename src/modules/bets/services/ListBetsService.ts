import { inject, injectable } from 'tsyringe';
import BetsRepository from '../infra/typeorm/repositories/BetsRepository';
import RedisCache from '@shared/cache/RedisCache';
import { IPaginateBet } from '@modules/bets/domain/models/IPaginateBet';
import Bet from '../infra/typeorm/entities/Bet';
import { IBet } from '../domain/models/IBet';

@injectable()
export default class ListBetsService {
	constructor(
		@inject('BetsRepository') private betsRepository: BetsRepository,
	) {}

	async execute(user_id: string): Promise<IPaginateBet | null> {
		//const bets = await this.betsRepository.findAllPaginate(user_id);

		let listBets = await RedisCache.recover<IPaginateBet>(
			`user-bets-${user_id}`,
		);

		if (!listBets) {
			listBets = await this.betsRepository.findAllPaginate(user_id);

			await RedisCache.save(`user-bets-${user_id}`, listBets);
		}

		return listBets;
	}
}
