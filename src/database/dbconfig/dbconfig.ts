import { ConnectionOptions } from "typeorm";

import User from "../entity/User";
import * as dotenv from 'dotenv';
import Products from "../entity/Products";
import Orders from "../entity/Orders";

dotenv.config();

const DBConfig = {
  DB_CONNECTION_NAME: 'default',
  connectionOptions: {
    name: 'default',
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    logging: true,
    entities: [User, Products, Orders],
    migrations: [],
    subscribers: [],
  } as ConnectionOptions
}

export default DBConfig;