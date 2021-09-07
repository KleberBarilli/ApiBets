import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUserStats } from '../domain/models/IUserStats';
import { IUserStatsRepository } from '../domain/repositories/IUserStatsRepositories';
import { IUpdateUserStats } from '../domain/models/IUpdateUserStats';

@injectable()
export default class UpdateUserStatsService {
	constructor(
		@inject('UserStatsRepository')
		private userStatsRepository: IUserStatsRepository,
	) {}
	async execute({
		username,
		total_bets,
		total_stake,
		profit,
		avg_odds,
		roi,
	}: IUpdateUserStats): Promise<IUserStats> {
		const userStats = await this.userStatsRepository.findByName(username);

		if (!userStats) {
			throw new AppError('User Stats Not found');
		}

		userStats.username = username;
		userStats.total_bets = total_bets;
		userStats.total_stake = total_stake;
		userStats.profit = profit;
		userStats.avg_odds = avg_odds;
		userStats.roi = roi;

		await this.userStatsRepository.save(userStats);

		return userStats;
	}
}
