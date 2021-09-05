import { ICreateBet } from '../models/ICreateBet';
import { IPaginateBet } from '../models/IPaginateBet';
import { IBet } from '../models/IBet';

export interface IBetsRepository {
	findAll(id: string): Promise<IBet[] | null>;
	findAllPaginate(id: string): Promise<IPaginateBet | null>;
	findById(id: string): Promise<IBet | undefined>;
	create(data: ICreateBet): Promise<IBet>;
	save(bet: IBet): Promise<IBet>;
	remove(bet: IBet): Promise<void>;
}
