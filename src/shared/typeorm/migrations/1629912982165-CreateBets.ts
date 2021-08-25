import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBets1629912982165 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'bets',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'user_bet_id',
						type: 'varchar',
					},
					{
						name: 'event',
						type: 'varchar',
					},
					{
						name: 'bookie',
						type: 'varchar',
					},
					{
						name: 'bet',
						type: 'varchar',
					},
					{
						name: 'stake',
						type: 'float',
					},
					{
						name: 'odd',
						type: 'float',
					},
					{
						name: 'sport',
						type: 'varchar',
					},
					{
						name: 'tag',
						type: 'varchar',
					},
					{
						name: 'tipster',
						type: 'varchar',
						default: null,
					},
					{
						name: 'status',
						type: 'varchar',
						default: null,
					},
					{
						name: 'result',
						type: 'float',
						default: 0,
					},
					{
						name: 'notes',
						type: 'text',
					},
					{
						name: 'created_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp with time zone',
						default: 'now()',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('bets');
	}
}
