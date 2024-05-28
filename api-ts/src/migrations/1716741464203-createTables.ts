import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1716741464203 implements MigrationInterface {
    name = 'CreateTables1716741464203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "zipCode" character varying(9) NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "complement" character varying, "neighborhood" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_a894a560d274a270f087c72ba0d" UNIQUE ("user"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
