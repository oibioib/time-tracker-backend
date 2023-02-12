import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Project, Timer, User } from '../entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Timer, Project],
  migrations: [],
  subscribers: [],
});

export default dataSource;
