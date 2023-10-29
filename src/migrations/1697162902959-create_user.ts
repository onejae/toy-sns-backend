import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1697162902959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO user (username, password) VALUES
        ('test-user', 'password123'),
        ('another-user', 'password456');
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
