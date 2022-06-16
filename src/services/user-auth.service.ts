import * as Joi from 'joi';
import * as jwt from 'jsonwebtoken';

import AuthPayLoad from '../models/auth-payload';
import AppConfig from './../config/app-config';
import User from './../models/user';
import { UserRepository } from '../database/repositories/User.repository';

export default class UserAuthService {
  constructor(private userRepository: UserRepository) { }
  private async getUserInfo<T>(searchObj: T) {
    return this.userRepository.getUserInfo({ ...searchObj });
  }
  private getJwtToken(jwtPayload: { password: string, email: string }): string {
    return jwt.sign(jwtPayload, AppConfig.SECRET_KEY, { expiresIn: '1800s' });
  }

  public async createUser(userEntityObject: User): Promise<AuthPayLoad> {
    const userEntitySchema = Joi.object({
      email: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
      name: Joi.string()
        .required(),
      firstName: Joi.string()
        .required(),
      lastName: Joi.string()
        .required(),
      age: Joi.required(),
    });

    const validationResult = userEntitySchema.validate(userEntityObject);
    if (validationResult?.error) {
      return Promise.resolve(
        {
          user: userEntityObject,
          token: '',
          message: `${validationResult?.error.details[0].message} - BAD request`,
          status: 400,
        });
    }
    let userDetailsArr: User[] = await this.getUserInfo({ email: userEntityObject.email });
    let userInfo = userDetailsArr[0];
    if (userInfo) {
      return Promise.resolve(
        {
          user: userInfo,
          token: '',
          message: 'User already exists',
          status: 400,
        });
    }
    await this.userRepository.createUser(userEntityObject);
    const jwtToken = this.getJwtToken({ password: userEntityObject.password, email: userEntityObject.email });
    userEntityObject.password = undefined;
    return Promise.resolve({ user: userEntityObject, token: jwtToken, status: 200, message: 'Ok' });
  }
  async login(data: Partial<User>): Promise<AuthPayLoad> {
    const userDetailsArr = await this.getUserInfo(data);
    const userInfo = userDetailsArr[0];
    if (userInfo) {
      const jwtToken = this.getJwtToken({ password: data.password, email: data.email });
      userInfo.password = undefined;
      return Promise.resolve({ user: userInfo, token: jwtToken, status: 200, message: 'Ok' });
    }
    return Promise.resolve({ user: data as any, status: 400, message: `Check email and Password` });
  }
}
