import User from './../../models/user';
import { GraphQLQueryBaseService } from './graphql-query.base.service';

export default class UserGraphQLService extends GraphQLQueryBaseService {
  public async login({ email, password }): Promise<any> {
    const AUTH_OPERATION = `
    mutation ($email: String!, $password: String!) {
      login(
        email: $email,
        password: $password
      ) {
       token, 
       status,
       user{
         email, 
         id
       }
      }
     }
    `;
    return this.execute(AUTH_OPERATION, { email, password });
  }

  public async register(requestPayload: any): Promise<any> {
    const AUTH_OPERATION = `
    mutation ($email: String!, $password: String!, $name:String, $firstName:String, $lastName:String, $age:Int) {
      register(
        email: $email,
        password: $password,
        name:$name,
        firstName:$firstName,
        lastName:$lastName,
        age:$age
      ) {
         token,
         status,
         message,
          user{
            id, 
            email
         }
       }
     }
    `;
    return this.execute(AUTH_OPERATION, requestPayload);
  }
}