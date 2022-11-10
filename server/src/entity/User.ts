import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', {
        unique: true
    })
    email: string

    @Column('varchar')
    password: string

}
