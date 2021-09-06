import User from '../../../../users/infra/typeorm/entities/User';
import { Exclude, Expose } from 'class-transformer';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
	Generated,
	OneToOne,
} from 'typeorm';
import League from '../../../../leagues/infra/typeorm/entities/League';

@Entity('bets')
export default class Bet {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@Generated('uuid')
	user_bet_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_bet_id' })
	user: User;

	@Column()
	event: string;

	@Column()
	bookie: string;

	@Column('float')
	bet: string;

	@Column('float')
	stake: number;

	@Column()
	odd: number;

	@Column()
	league: string;

	@Column()
	league_icon: string;

	@Column()
	sport: string;

	@Column()
	tag: string;

	@Column()
	tipster: string;

	@Column()
	status: string;

	@Column('float')
	result: number;

	@Column()
	notes: string;

	@CreateDateColumn()
	date: Date;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Expose({ name: 'league_icon' })
	getLeagueUrl(): string | null {
		if (this.league_icon) {
			return null;
		}
		return this.league_icon;
	}
}
