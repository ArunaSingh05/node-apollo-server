import * as express from 'express';
import * as morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './src/apollo-server/schema';
import Database from './src/database/connection';
import AppConfig from './src/config/app-config';
import { allRouters } from './src/routes/index';
import { resolvers } from './src/apollo-server/resolvers/index';


const app = express();
app.use(express.json());
app.use(morgan('dev'));

async function startApolloServer() {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => { return { req } },
    });
    await server.start();
    server.applyMiddleware({ app });
    app.use('/api', allRouters);
    const errorHandler =
      (error: any, req: any, res: any, next) => {
        res.status(500).json({ errorStack: error.stack });
      }
    app.use(errorHandler);
    initializeDbConnection();
    app.listen({ port: AppConfig.port }, () => {
      console.log(`🚀 Node Server ready at ${AppConfig.basePath}:${AppConfig.port}`);
      console.log(`🚀 GraphQL Server ready at ${AppConfig.basePath}:${AppConfig.port}${server.graphqlPath}`);
    });
  } catch (error) {
    throw error;
  }
}

async function initializeDbConnection() {
  try {
    new Database();
  } catch (error) {
    throw error;
  }
}

startApolloServer();
