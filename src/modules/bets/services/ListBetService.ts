import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Bet from '../typeorm/entities/Bet';
import BetsRepository from '../typeorm/repositories/BetsRepository';

interface IRequest {
	id: string;
}

export default class ShowBetService {
	async execute({ id }: IRequest): Promise<Bet | undefined> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const bet = await betsRepositories.findOne(id);

		if (!bet) {
			throw new AppError('Bet Not found');
		}

		return bet;
	}
}
