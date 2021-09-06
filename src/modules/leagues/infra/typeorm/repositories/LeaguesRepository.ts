import { ICreateLeague } from '@modules/leagues/domain/models/ICreateLeague';
import { ILeaguesRepository } from '@modules/leagues/domain/repositories/ILeaguesRepository';
import { getRepository, Repository } from 'typeorm';
import League from '../entities/League';

export default class LeaguesRepository implements ILeaguesRepository {
	private ormRepository: Repository<League>;
	constructor() {
		this.ormRepository = getRepository(League);
	}

	public async create({
		league,
		league_icon,
		country,
	}: ICreateLeague): Promise<League> {
		const liga = this.ormRepository.create({
			league,
			league_icon,
			country,
		});

		await this.ormRepository.save(liga);

		return liga;
	}

	public async save(league: League): Promise<League> {
		await this.ormRepository.save(league);

		return league;
	}

	public async findByName(league: string): Promise<League | undefined> {
		const product = this.ormRepository.findOne({
			where: {
				league,
			},
		});

		return product;
	}

	public async findById(id: number): Promise<League | undefined> {
		const liga = await this.ormRepository.findOne({
			where: {
				id,
			},
		});
		return liga;
	}

	public async findAll(): Promise<League[]> {
		const ligas = await this.ormRepository.find();

		return ligas;
	}
}
