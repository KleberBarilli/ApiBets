import { injectable, inject } from 'tsyringe';
import { ICreateUserStats } from '../domain/models/ICreateUserStats';
import { IUserStats } from '../domain/models/IUserStats';
import { IUserStatsRepository } from '../domain/repositories/IUserStatsRepositories';

@injectable()
export default class CreateUserStatsService {
	constructor(
		@inject('UserStatsRepository')
		private userStatsRepository: IUserStatsRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		username,
		total_bets,
		total_stake,
		profit,
		avg_odds,
		roi,
	}: ICreateUserStats): Promise<IUserStats> {
		const userStats = await this.userStatsRepository.create({
			username,
			total_bets,
			total_stake,
			profit,
			avg_odds,
			roi,
		});

		return userStats;
	}
}
