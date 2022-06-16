import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'user' })
export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    age: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: String

    @Column()
    firstName: String

    @Column()
    lastName: String
}
