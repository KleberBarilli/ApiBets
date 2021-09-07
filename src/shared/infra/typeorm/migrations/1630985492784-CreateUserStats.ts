import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserStats1630985492784 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'user_stats',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'username',
						type: 'varchar',
					},
					{
						name: 'total_bets',
						type: 'int',
					},
					{
						name: 'total_stake',
						type: 'float',
					},
					{
						name: 'profit',
						type: 'float',
					},
					{
						name: 'avg_odds',
						type: 'float',
					},
					{
						name: 'roi',
						type: 'float',
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
		await queryRunner.dropTable('user_stats');
	}
}
