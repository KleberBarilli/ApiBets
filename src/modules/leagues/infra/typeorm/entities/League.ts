import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { ILeague } from '@modules/leagues/domain/models/ILeague';

@Entity('leagues')
export default class League implements ILeague {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	league: string;

	@Column()
	league_icon: string;

	@Column()
	country: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
