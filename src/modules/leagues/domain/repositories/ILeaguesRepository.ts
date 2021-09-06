import { ICreateLeague } from '../models/ICreateLeague';
import { ILeague } from '../models/ILeague';

export interface ILeaguesRepository {
	findAll(): Promise<ILeague[]>;
	//findById(id: number): Promise<ILeague | undefined>;
	findByName(league: string): Promise<ILeague | undefined>;
	create(data: ICreateLeague): Promise<ILeague>;
	save(user: ILeague): Promise<ILeague>;
}
