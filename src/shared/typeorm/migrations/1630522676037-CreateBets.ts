import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBets1630522676037 implements MigrationInterface {
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
						type: 'uuid',
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
						default: null,
					},
					{
						name: 'tag',
						type: 'varchar',
						default: null,
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
						default: null,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
						default: 'now()',
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
				foreignKeys: [
					{
						name: 'FKUser',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_bet_id'],
						onDelete: 'CASCADE',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('bets');
	}
}