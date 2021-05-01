import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnTypeOnConnectionsTable1619902779927 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("connections", "admin_id", new TableColumn({
            name: "admin_id",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("connections", "admin_id", new TableColumn({
            name: "admin_id",
            type: "uuid",
            isNullable: true
        }))
    }

}
