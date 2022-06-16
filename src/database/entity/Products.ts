import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export default class Products {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  productCode: string;
  @Column()
  productName: string;
  @Column()
  productLine: string;
  @Column()
  productScale: string;
  @Column()
  productVendor: string;
  @Column()
  productDescription: string;
  @Column()
  quantityInStock: string;
  @Column()
  buyPrice: number;
  @Column()
  MSRP: number
}
