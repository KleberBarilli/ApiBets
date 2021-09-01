import User from '../../../users/typeorm/entities/User';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
	Generated,
} from 'typeorm';

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
}
