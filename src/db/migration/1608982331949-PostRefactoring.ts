import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1608982331949 implements MigrationInterface {
  name = "PostRefactoring1608982331949";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "created_at" DROP NOT NULL`
    );
  }
}
