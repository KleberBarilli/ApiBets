import { EntityRepository, Repository } from 'typeorm';
import Bet from '../entities/Bet';

@EntityRepository(Bet)
export default class BetRepository extends Repository<Bet> {
	public async findById(id: string): Promise<Bet | undefined> {
		const bet = this.findOne({
			where: {
				id,
			},
		});
		return bet;
	}
}
