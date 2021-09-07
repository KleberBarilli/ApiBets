import { ICreateUserStats } from '../models/ICreateUserStats';
import { IUserStats } from '../models/IUserStats';

export interface IUserStatsRepository {
	findByName(username: string): Promise<IUserStats | undefined>;
	create(data: ICreateUserStats): Promise<IUserStats>;
	save(userStats: IUserStats): Promise<IUserStats>;
}
