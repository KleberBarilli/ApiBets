import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import BetsRepository from '../infra/typeorm/repositories/BetsRepository';
import Bet from '../infra/typeorm/entities/Bet';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import RedisCache from '@shared/cache/RedisCache';
interface IBetRequest {
	user_bet_id: string;
	event: string;
	bookie: string;
	bet: string;
	stake: number;
	odd: number;
	sport: string;
	tag: string;
	tipster: string;
	status: string;
	result: number;
	notes: string;
	date: Date;
}

export default class CreateBetService {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		user_bet_id,
		event,
		bookie,
		bet,
		stake,
		odd,
		sport,
		tag,
		tipster,
		status,
		result,
		notes,
		date,
	}: IBetRequest): Promise<Bet> {
		const betsRepositories = getCustomRepository(BetsRepository);

		const userRepositories = getCustomRepository(UsersRepository);

		const user_id = await userRepositories.findOne(user_bet_id);

		if (!user_id) {
			throw new AppError('Error with user');
		}

		const selection = betsRepositories.create({
			user_bet_id,
			event,
			bookie,
			bet,
			stake,
			odd,
			sport,
			tag,
			tipster,
			status,
			result,
			notes,
			date,
		});

		await RedisCache.invalidate(`user-bets-${user_bet_id}`);

		await betsRepositories.save(selection);

		return selection;
	}
}
