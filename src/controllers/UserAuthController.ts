import User from "../models/user";
import UserGraphQLService from "../services/graphql-client/user-graphql.service";

export class UserAuthController {
  constructor(private userGraphQLService: UserGraphQLService) { }
  public async login(req: any, res: any, _) {
    const response: any = await this.userGraphQLService.login({ email: req.body.email, password: req.body.password });
    if (response.data?.login?.token) {
      res.setHeader('Authorization', 'Bearer ' + response.data?.login?.token);
      res.status(200).send({ data: response.data?.login.user });
    } else {
      res.status(400).send({ message: 'Check username and passowrd' });
    }
  }

  public async register(req: any, res: any, _) {
    const requestObj = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age
    };
    const response: any = await this.userGraphQLService.register(requestObj);
    if (response.data?.register?.status === 400) {
      res.status(400).send({
        message: response.data.register.message
      });
    }
    else if (response.data?.register?.token) {
      res.setHeader('Authorization', 'Bearer ' + response.data?.register?.token);
      res.status(200).send({ data: response.data?.register.user });
    }
  }
}