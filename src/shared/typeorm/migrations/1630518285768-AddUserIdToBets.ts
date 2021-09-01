import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from 'typeorm';

export class AddUserIdToBets1630518285768 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'bets',
			new TableColumn({
				name: 'user_bet_id',
				type: 'uuid',
			}),
		);

		await queryRunner.createForeignKey(
			'bets',
			new TableForeignKey({
				name: 'FKUser',
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				columnNames: ['user_bet_id'],
				onDelete: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('bets', 'FKUser');
		await queryRunner.dropColumn('bets', 'bet_user_id');
	}
}
