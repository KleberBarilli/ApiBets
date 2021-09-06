import { injectable, inject } from 'tsyringe';
import { ILeague } from '../domain/models/ILeague';
import { ILeaguesRepository } from '../domain/repositories/ILeaguesRepository';

@injectable()
export default class ListLeagueService {
	constructor(
		@inject('LeaguesRepository')
		private leaguesRepository: ILeaguesRepository,
	) {}
	public async execute(): Promise<ILeague[]> {
		const leagues = await this.leaguesRepository.findAll();

		return leagues;
	}
}
