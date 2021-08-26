import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import BetsRepository from '../typeorm/repositories/BetsRepository';
import Bet from '../typeorm/entities/Bet';
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
	}: IBetRequest): Promise<Bet> {
		const betsRepositories = getCustomRepository(BetsRepository);
		//const userRepositories = getCustomRepository(UsersRepositories);

		// const betAlreadyExists = await betsRepositories.findOne({})
		//const user_id = await userRepositories.findOne(user_bet_id);
		const user_id = 'kleber_4654ID';

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
		});

		await betsRepositories.save(selection);

		return selection;
	}
}
