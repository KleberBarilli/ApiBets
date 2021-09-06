import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateLeague } from '../domain/models/ICreateLeague';
import { ILeague } from '../domain/models/ILeague';
import { ILeaguesRepository } from '../domain/repositories/ILeaguesRepository';

@injectable()
export default class CreateLeagueService {
	constructor(
		@inject('LeaguesRepository')
		private leaguesRepository: ILeaguesRepository,
	) {}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	public async execute({
		league,
		league_icon,
		country,
	}: ICreateLeague): Promise<ILeague> {
		const leagueExists = await this.leaguesRepository.findByName(league);

		if (leagueExists) {
			throw new AppError('League already exist');
		}

		const liga = await this.leaguesRepository.create({
			league,
			league_icon,
			country,
		});

		return liga;
	}
}
