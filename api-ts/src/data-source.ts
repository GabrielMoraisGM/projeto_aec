import 'reflect-metadata';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER || "application_aec",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "db_aec",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
  subscribers: [],
  migrations: ["src/migrations/**/*.ts"]
})
