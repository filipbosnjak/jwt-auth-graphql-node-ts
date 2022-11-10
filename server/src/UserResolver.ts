import {Resolver, Query, Mutation, Arg} from 'type-graphql'
import { User } from './entity/User'
import {hash} from 'bcryptjs'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "hi from resolvers"
    }

    //@Mutation(what_it_should_return)
    @Mutation(() => Boolean)
    async register(
        @Arg('email', () => String) email: string,
        @Arg('password', () => String) password: string
    ) {

        const userExists = await User.findOne({
            where: {
                email
            }
        })
        console.log(userExists);
        

        const hashedPassword: string = await hash(password, 12)
        try {
            await User.insert({
                email,
                password: hashedPassword
            })
        } catch(e) {
            console.log(e);
            return false
        }
        return true
    }
}