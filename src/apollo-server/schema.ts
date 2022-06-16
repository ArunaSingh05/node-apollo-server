import Mutation from './root/root-mutation.type';
import Query from './root/root-query.type';
import AuthPayLoad from './types/auth-payload.type';
import User from './types/user.type';

const SchemaDefinition = `
  schema {
    query: Query,
    mutation: Mutation
  }`;

const typeDefs = [
  SchemaDefinition,
  Query,
  AuthPayLoad,
  User,
  Mutation
];


export default typeDefs;