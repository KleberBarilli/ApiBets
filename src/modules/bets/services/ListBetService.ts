import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBet } from '../domain/models/IBet';
import { IShowBet } from '../domain/models/IShowBet';
import { IBetsRepository } from '../domain/repositories/IBetsRepository';

@injectable()
export default class ShowBetService {
	constructor(
		@inject('BetsRepository') private betsRepository: IBetsRepository,
	) {}
	async execute({ id }: IShowBet): Promise<IBet | undefined> {
		const bet = await this.betsRepository.findById(id);

		if (!bet) {
			throw new AppError('Bet Not found');
		}

		return bet;
	}
}
