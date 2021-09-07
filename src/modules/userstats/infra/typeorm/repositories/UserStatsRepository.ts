import { ICreateUserStats } from '@modules/userstats/domain/models/ICreateUserStats';
import { IUserStatsRepository } from '@modules/userstats/domain/repositories/IUserStatsRepositories';
import { getRepository, Repository } from 'typeorm';
import UserStats from '../entities/UserStats';

export default class UsersStatsRepository implements IUserStatsRepository {
	private ormRepository: Repository<UserStats>;
	constructor() {
		this.ormRepository = getRepository(UserStats);
	}

	public async create({
		username,
		total_bets,
		total_stake,
		profit,
		avg_odds,
		roi,
	}: ICreateUserStats): Promise<UserStats> {
		const userStats = this.ormRepository.create({
			username,
			total_bets,
			total_stake,
			profit,
			avg_odds,
			roi,
		});

		await this.ormRepository.save(userStats);

		return userStats;
	}

	public async save(userStats: UserStats): Promise<UserStats> {
		await this.ormRepository.save(userStats);

		return userStats;
	}

	public async findByName(username: string): Promise<UserStats | undefined> {
		const user = await this.ormRepository.findOne({
			where: {
				username,
			},
		});
		return user;
	}
}
