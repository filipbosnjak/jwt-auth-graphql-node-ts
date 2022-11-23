import { User } from "../entity/User";
import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Post } from "../entity/Post";

@ObjectType()
class CreatePostResponse {
  @Field()
  status: Boolean;
  @Field()
  reason: String;
}

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getPosts() {
    return await Post.find();
  }

  @Mutation(() => CreatePostResponse)
  async createPost(
    @Arg("title", () => String) title: String,
    @Arg("text", () => String) text: String,
    @Arg("route", () => String) route: String,
    @Arg("author", () => Int) authorId: number
  ): Promise<CreatePostResponse> {
    try {
      const author: User | null = await User.findOne({
        where: {
          id: authorId,
        },
      });
      if (author) {
        await Post.insert({
          title,
          text,
          route,
          author,
        });
        return {
          status: true,
          reason: "Success",
        };
      } else {
        return {
          status: false,
          reason: "Author not found",
        };
      }
    } catch (e) {
      console.log(e);
      return {
        status: false,
        reason: e,
      };
    }
  }
}
