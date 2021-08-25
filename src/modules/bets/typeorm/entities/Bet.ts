import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
} from 'typeorm';

@Entity('bets')
export default class Bet {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	user_bet_id: string;

	//@JoinColumn({ name: 'user_bet_id' })
	//@ManyToOne(() => User)
	//user_id: User;

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
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
