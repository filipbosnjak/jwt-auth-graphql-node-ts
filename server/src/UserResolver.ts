import {Resolver, Query, Mutation, Arg} from 'type-graphql'

@Resolver()
export class UserResolver {
    @Query(() => String)
    hello() {
        return "hi from resolvers"
    }

    @Mutation()
    register(
        @Arg('email', () => String) email: String,
        @Arg('password', () => String) password: String
    ) {

    }
}