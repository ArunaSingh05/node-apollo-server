import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export default class Orders {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  orderNumber: number;

  @Column()
  orderDate: string;

  @Column()
  requiredDate: string;

  @Column()
  shippedDate: string;

  @Column()
  status: string;

  @Column()
  comments: string;

  @Column()
  customerNumber: number;
}