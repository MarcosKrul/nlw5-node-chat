import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettingsTable1619789336297 implements MigrationInterface {

    // yarn typeorm migration:run
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'settings',
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar"
                },
                {
                    name: "chat",
                    type: "boolean",
                    default: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));
    }

    // yarn typeorm migration:revert
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}
