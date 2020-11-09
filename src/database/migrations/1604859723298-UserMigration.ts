import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserMigration1604859723298 implements MigrationInterface {

  private tableName: string = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: "id",
          type: "varchar",
          isPrimary: true,
          isUnique: true,
          generationStrategy: "uuid"
        },
        {
          name: "email",
          type: "varchar",
          length: "150",
          isUnique: true,
          isNullable: false
        },
        {
          name: "username",
          type: "varchar",
          length: "30",
          isUnique: true,
          isNullable: false
        },
        {
          name: "password",
          type: "varchar",
          length: "30",
          isNullable: false
        },
        {
          name: "firstname",
          type: "varchar",
          length: "100",
          isNullable: true
        },
        {
          name: "lastname",
          type: "varchar",
          length: "100",
          isNullable: true
        },
        {
          name: "status",
          type: "enum",
          enum: ["active", "inactive"],
          default: "'active'"
        },
        {
          name: "remember_token",
          type: "varchar",
          length: "100",
          isNullable: true
        },
        {
          name: "created_at",
          type: "timestamp",
          isNullable: false,
          default: 'now()'
        },
        {
          name: "updated_at",
          type: "timestamp",
          isNullable: true
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
