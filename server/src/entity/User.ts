import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    email: string

    @Column()
    password: number

}
