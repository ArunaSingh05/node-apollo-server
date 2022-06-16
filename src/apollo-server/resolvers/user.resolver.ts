import AuthPayLoad from "./../models/auth-payload.input";
import UserAuthService from '../../services/user-auth.service';

export class UserResolver {
  constructor(private authService: UserAuthService) {
  }
  async getUserById(_, __, { req }) {
    const token = req.headers.authorization || '';
    if (!token) {
      return { status: 403, message: 'UnAuthorized' };
    }
  }
  async register(_, args, __): Promise<AuthPayLoad> {
    const requestObj = {
      name: args.name,
      email: args.email,
      password: args.password,
      firstName: args.firstName,
      lastName: args.lastName,
      age: args.age
    } as any;

    try {
      return this.authService.createUser(requestObj);
    }
    catch (error) {
      console.log(error);
    }
  }
  async login(_, args, __): Promise<AuthPayLoad> {
    return await this.authService.login({ email: args.email, password: args.password });
  }
}