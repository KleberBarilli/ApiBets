import RedisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IBet } from '../domain/models/IBet';
import { IBetsRepository } from '../domain/repositories/IBetsRepository';
import { IUpdateBet } from '../domain/models/IUpdateBet';

@injectable()
export default class UpdateBetService {
	constructor(
		@inject('BetsRepository') private betsRepository: IBetsRepository,
	) {}
	async execute({
		id,
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
	}: IUpdateBet): Promise<IBet> {
		const wager = await this.betsRepository.findById(id);

		if (!wager) {
			throw new AppError('Bet Not found');
		}

		await RedisCache.invalidate(`user-bets-${user_bet_id}`);

		wager.user_bet_id = user_bet_id;
		wager.event = event;
		wager.bookie = bookie;
		wager.bet = bet;
		wager.stake = stake;
		wager.odd = odd;
		wager.league = league;
		wager.league_icon = league_icon;
		wager.sport = sport;
		wager.tag = tag;
		wager.tipster = tipster;
		wager.status = status;
		wager.result = result;
		wager.notes = notes;
		wager.date = date;

		await this.betsRepository.save(wager);

		return wager;
	}
}
