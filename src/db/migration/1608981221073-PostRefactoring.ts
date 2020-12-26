import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1608981221073 implements MigrationInterface {
  name = "PostRefactoring1608981221073";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "created" TO "created_at"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "created_at" TO "created"`
    );
  }
}
