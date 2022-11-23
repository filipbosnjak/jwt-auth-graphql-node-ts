import { Field, Int, ObjectType } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User"

@ObjectType()
@Entity('posts')
export class Post extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: Number

    @Field()
    @Column('text', {
        unique: true
    })
    title: String

    @Field()
    @Column('text')
    text: String

    @Field()
     @Column('text')
     route: String

     @Field()
     @OneToOne(() => User)
     @JoinColumn()
     author: User
}
