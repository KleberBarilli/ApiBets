import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddUserIdToUserToken1630518311755 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'user_tokens',
			new TableColumn({
				name: 'user_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'user_tokens',
			new TableForeignKey({
				name: 'TokenUserFK',
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				columnNames: ['user_id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('user_tokens', 'TokenUserFK');
		await queryRunner.dropColumn('user_tokens', 'user_id');
	}
}
