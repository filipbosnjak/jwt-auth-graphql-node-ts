import express from 'express'
import { Request, Response } from "express"
import "reflect-metadata"
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from "./resolvers/UserResolver";
import { AppDataSource } from "./data-source";
import { PostResolver } from "./resolvers/PostResolver";
import "dotenv/config";

// Function that calls itself
// (() => {})()

(async () => {

    const app = express();

    console.log(process.env.REFRESH_TOKEN_SECRET);

    app.get("/", (_: Request, res: Response) => {
      res.send("express");
    });

    //Create db connection
    await AppDataSource.initialize();

    //Apollo server
    /**
     * typeDefs: `
        type Query {
            hello: String
        }
        `,
        resolvers: {
            Query: {
                hello: () => "some string from resolver"
            }
        }
     */
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [UserResolver, PostResolver],
      }),
      context: ({ req, res }) => ({ req, res }),
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4040, () => {
      console.log("express server started");
      console.log(`graphql playground at ${apolloServer.graphqlPath}`);
    });
})()

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
