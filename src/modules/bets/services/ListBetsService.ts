import { getCustomRepository } from 'typeorm';
import Bet from '../typeorm/entities/Bet';
import BetsRepository from '../typeorm/repositories/BetsRepository';

export default class ListBetsService {
	async execute(user_id: string): Promise<Bet[]> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const bets = await betsRepositories.find({
			where: {
				user_bet_id: user_id,
			},
		});

		return bets;
	}
}
