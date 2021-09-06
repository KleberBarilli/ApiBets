import { getRepository, Repository } from 'typeorm';
import { IPaginateBet } from '@modules/bets/domain/models/IPaginateBet';
import { IBetsRepository } from '@modules/bets/domain/repositories/IBetsRepository';
import { ICreateBet } from '@modules/bets/domain/models/ICreateBet';
import Bet from '../entities/Bet';

export default class BetsRepository implements IBetsRepository {
	private ormRepository: Repository<Bet>;

	constructor() {
		this.ormRepository = getRepository(Bet);
	}

	public async findById(id: string): Promise<Bet | undefined> {
		const bet = this.ormRepository.findOne({
			where: {
				id,
			},
		});
		return bet;
	}

	public async findAllPaginate(id: string): Promise<IPaginateBet | null> {
		const bet = await this.ormRepository
			.createQueryBuilder()
			.where({
				user_bet_id: id,
			})
			.orderBy({
				date: 'DESC',
			})
			.paginate();

		return bet as IPaginateBet;
	}

	public async findAll(): Promise<any | null> {
		const bets = await this.ormRepository.find();

		return bets;
	}

	public async create({
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
	}: ICreateBet): Promise<Bet> {
		const wager = this.ormRepository.create({
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
		});

		await this.ormRepository.save(wager);

		return wager;
	}

	public async save(bet: Bet): Promise<Bet> {
		await this.ormRepository.save(bet);

		return bet;
	}

	public async remove(bet: Bet): Promise<void> {
		await this.ormRepository.remove(bet);
	}
}
