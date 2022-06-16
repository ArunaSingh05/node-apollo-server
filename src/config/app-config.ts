import * as dotenv from 'dotenv';
dotenv.config();

const AppConfig = {
  SECRET_KEY: process.env.SECRET_KEY || 'test-jwt-secret-key',
  port: process.env.APP_PORT,
  basePath: 'http://localhost',
  database: {
    type: 'mysql',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }
  },
  graphQueryConnectionConfig: {
    hostname: 'localhost',
    port: process.env.APP_PORT,
    path: '/graphql',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}


export default AppConfig;
