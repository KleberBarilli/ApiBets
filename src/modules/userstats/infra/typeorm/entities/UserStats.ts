import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';
import { IUserStats } from '@modules/userstats/domain/models/IUserStats';

@Entity('user_stats')
export default class UserStats implements IUserStats {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column()
	total_bets: number;

	@Column()
	total_stake: number;

	@Column()
	profit: number;

	@Column()
	avg_odds: number;

	@Column()
	roi: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
