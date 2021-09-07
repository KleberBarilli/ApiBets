import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserStats } from '../domain/models/IUserStats';
import { IShowUserStats } from '../domain/models/IShowUserStats';
import { IUserStatsRepository } from '../domain/repositories/IUserStatsRepositories';

@injectable()
export default class ShowUserStatsService {
	constructor(
		@inject('UserStatsRepository')
		private userStatsRepository: IUserStatsRepository,
	) {}
	async execute({
		username,
	}: IShowUserStats): Promise<IUserStats | undefined> {
		const userStats = await this.userStatsRepository.findByName(username);

		if (!userStats) {
			throw new AppError('Error with user stats');
		}

		return userStats;
	}
}
