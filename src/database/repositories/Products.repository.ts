import { EntityRepository, FindOptionsWhere, Repository } from "typeorm";

import Products from "../entity/Products";
import BaseRepository from "./Base.repository";

@EntityRepository(Products)

export default class ProductsRepository extends BaseRepository {
  productRepository: Repository<Products>

  async getProductList(options: FindOptionsWhere<Products>): Promise<Products[]> {
    this.productRepository = await this.getRepository(Products);
    return this.productRepository.find(
      {
        where: options
      }
    );
  }
  async updateProduct<T>(productEntity: T, findByOptions: FindOptionsWhere<any>): Promise<any> {
    this.productRepository = await this.getRepository(Products);
    await this.productRepository
      .update(findByOptions, productEntity)
    return this.getProductList(findByOptions);
  }
  async addProduct<T>(productEntity: T): Promise<any> {
    this.productRepository = await this.getRepository(Products);
    await this.productRepository.save(productEntity)
    return this.getProductList(productEntity);
  }

  async deleteProduct<T>(deleteByOption: T): Promise<any> {
    this.productRepository = await this.getRepository(Products);
    const productInfo = this.getProductList(deleteByOption);
    await this.productRepository.delete(deleteByOption)
    return productInfo;
  }
}