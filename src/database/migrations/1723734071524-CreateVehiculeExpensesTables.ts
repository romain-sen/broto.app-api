import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVehiculeExpensesTables1723734071524
  implements MigrationInterface
{
  name = 'CreateVehiculeExpensesTables1723734071524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "fuel_expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "dateOfExpense" date NOT NULL DEFAULT now(), "note" text NOT NULL DEFAULT '', "litres" double precision NOT NULL, "mileage" double precision NOT NULL, "cost" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "vehiculeId" uuid, CONSTRAINT "PK_f0e4acc71c4e4ace30cdd193615" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vehicule" ("name" character varying NOT NULL, "licensePlate" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fuelExpensesId" uuid, CONSTRAINT "PK_265cd1c18f3a0376d49bedf27ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fuel_expense" ADD CONSTRAINT "FK_0b04ad3704f976d53ef2bfe0615" FOREIGN KEY ("vehiculeId") REFERENCES "vehicule"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "fuel_expense" ADD CONSTRAINT "FK_f5804e953ddd57bdb8f2d9f1d28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vehicule" ADD CONSTRAINT "FK_23529f38b1a5336d614d2c65ca9" FOREIGN KEY ("fuelExpensesId") REFERENCES "fuel_expense"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicule" DROP CONSTRAINT "FK_23529f38b1a5336d614d2c65ca9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fuel_expense" DROP CONSTRAINT "FK_f5804e953ddd57bdb8f2d9f1d28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fuel_expense" DROP CONSTRAINT "FK_0b04ad3704f976d53ef2bfe0615"`,
    );
    await queryRunner.query(`DROP TABLE "vehicule"`);
    await queryRunner.query(`DROP TABLE "fuel_expense"`);
  }
}
