import { UserRepository } from '../../database/repositories/User.repository';
import UserAuthService from '../../services/user-auth.service';
import { UserResolver } from '../resolvers/user.resolver';

const userRepository = new UserRepository();
const authService = new UserAuthService(userRepository);
const resolvers = new UserResolver(authService);


export const Mutation = {
  login: resolvers.login.bind(resolvers),
  register: resolvers.register.bind(resolvers)
}