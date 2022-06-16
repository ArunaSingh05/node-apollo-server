import { EntityRepository, FindOptionsWhere } from "typeorm";

import Orders from "../entity/Orders";
import BaseRepository from "./Base.repository";

@EntityRepository(Orders)

export default class OrdersRepository extends BaseRepository {

  async getOrderList<T>(findByOption: FindOptionsWhere<T>): Promise<any> {
    // Get Repository
    // Find on table
    const orderRepository = await this.getRepository(Orders);
    return orderRepository.findOne({
      where: findByOption
    })
  }
}