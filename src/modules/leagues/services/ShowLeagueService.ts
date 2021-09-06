import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ILeague } from '../domain/models/ILeague';
import { IShowLeague } from '../domain/models/IShowLeague';
import { ILeaguesRepository } from '../domain/repositories/ILeaguesRepository';

@injectable()
class ShowLeagueService {
	constructor(
		@inject('LeaguesRepository')
		private leaguesRepository: ILeaguesRepository,
	) {}

	public async execute({ league }: IShowLeague): Promise<ILeague> {
		const liga = await this.leaguesRepository.findByName(league);

		if (!liga) {
			throw new AppError('League not found.');
		}

		return liga;
	}
}

export default ShowLeagueService;
