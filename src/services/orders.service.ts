import OrdersRepository from './../database/repositories/Orders.repository';
export default class OrderService {

  constructor(private ordersRepository: OrdersRepository) { }
  //connect to repository
  async getOrderList<T>(findByOptions: T) {
    return this.ordersRepository.getOrderList(findByOptions);
  }
}