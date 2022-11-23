import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
} from "type-graphql";
import { User } from "../entity/User";
import { compare, hash } from "bcryptjs";
import { MyContext } from "src/types/context";
import { createAccessToken, createRefreshToken } from "../authentication/auth";

@ObjectType()
class LoginResponse {
  @Field()
  accesToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi from resolvers";
  }

  @Query(() => [User])
  getAllUsers() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("password incorrect");
    }

    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true, //Cookie cannot be accessed by javascript
    });

    return {
      accesToken: createAccessToken(user),
    };
  }

  //@Mutation(what_it_should_return)
  @Mutation(() => Boolean)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ) {
    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log(userExists);

    const hashedPassword: string = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
