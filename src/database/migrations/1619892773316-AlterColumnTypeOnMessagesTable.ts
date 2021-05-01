import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnTypeOnMessagesTable1619892773316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("messages", "admin_id", new TableColumn({
            name: "admin_id",
            type: "varchar",
            isNullable: true
        }))
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("messages", "admin_id", new TableColumn({
            name: "admin_id",
            type: "uuid",
            isNullable: true
        }))
    }

}
