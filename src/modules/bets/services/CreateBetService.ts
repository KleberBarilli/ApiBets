import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { IBetsRepository } from '../domain/repositories/IBetsRepository';
import { ICreateBet } from '../domain/models/ICreateBet';
import { IBet } from '../domain/models/IBet';
import RedisCache from '@shared/cache/RedisCache';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';

@injectable()
export default class CreateBetService {
	constructor(
		@inject('BetsRepository') private betsRepository: IBetsRepository,
		@inject('UsersRepository') private usersRepository: IUsersRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		user_bet_id,
		event,
		bookie,
		bet,
		stake,
		odd,
		league,
		league_icon,
		sport,
		tag,
		tipster,
		status,
		result,
		notes,
		date,
	}: ICreateBet): Promise<IBet> {
		const user_id = await this.usersRepository.findById(user_bet_id);

		if (!user_id) {
			throw new AppError('Error with user');
		}

		const wager = this.betsRepository.create({
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			league,
			league_icon,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		});

		await RedisCache.invalidate(`user-bets-${user_bet_id}`);

		return wager;
	}
}
