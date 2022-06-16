import { EntityRepository, FindOptionsWhere, getRepository, Repository } from "typeorm";

import User from "../entity/User";
import BaseRepository from "./Base.repository";

@EntityRepository(User)
export class UserRepository extends BaseRepository {
  public async getUserInfo(params: FindOptionsWhere<User>): Promise<any> {
    const userRepository = await this.getRepository(User);
    return userRepository.find(
      {
        where: params
      }
    );
  }
  public async createUser(entityObj): Promise<any> {
    const userRepository = await this.getRepository(User);
    return userRepository.insert(entityObj);
  }
}