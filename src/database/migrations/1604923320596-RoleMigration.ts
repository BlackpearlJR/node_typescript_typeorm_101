import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class RoleMigration1604923320596 implements MigrationInterface {

  private tableName: string = 'roles';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "name",
          type: "varchar",
          length: "30",
          isUnique: true,
          isNullable: false
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
