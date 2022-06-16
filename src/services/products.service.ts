import ProductsRepository from "../database/repositories/Products.repository";

export default class ProductService {
  constructor(private productRepository: ProductsRepository) { }

  async getProducts(filterByOptions: any): Promise<any> {
    return this.productRepository.getProductList(filterByOptions);
  }
  async updateProduct<T>(productEntity: T): Promise<T> {
    const { productCode } = { ...productEntity } as any;
    const whereOption = { productCode: productCode };
    return this.productRepository.updateProduct(productEntity, whereOption);
  }
  async addProduct<T>(productEntity: T): Promise<T> {
    return this.productRepository.addProduct(productEntity);
  }
  async deleteProduct<T>(deleteByOptions: T): Promise<T> {
    return this.productRepository.deleteProduct(deleteByOptions);
  }
}