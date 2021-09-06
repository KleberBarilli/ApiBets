import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLeagues1630894356355 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'leagues',
				columns: [
					{
						name: 'id',
						type: 'int',
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'league',
						type: 'varchar',
					},
					{
						name: 'league_icon',
						type: 'varchar',
						isPrimary: true,
					},
					{
						name: 'country',
						type: 'varchar',
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
		await queryRunner.dropTable('leagues');
	}
}
