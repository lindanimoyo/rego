/**
 * The file is the main entry point to the application.
 *
 * This is where the server is initialized
 *
 * */
import fs from 'fs'
import path from 'path'
import express from 'express'
import {ApolloServer} from "apollo-server-express";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {connectToDB} from "./database/connection.js";
import * as models from "./database/models.js";
import {
    createUser,
    deleteUser,
    fetchUser,
    fetchUsers,
    login,
    updateUser
} from "./resolvers/user";
import {
    createPublication,
    fetchPublications,
    fetchPublication,
    deletePublication
} from "./resolvers/publication";
import {
    createBookmark,
    fetchBookmarks,
    fetchBookmark,
    deleteBookmark
} from "./resolvers/bookmark";

connectToDB();

const resolvers = {
    Query: {
        fetchUsers,
        fetchPublications,
        fetchBookmarks
    },
    Mutation: {
        createUser,
        createBookmark,
        createPublication,
        deleteUser,
        deleteBookmark,
        deletePublication,
        fetchUser,
        fetchBookmark,
        fetchPublication,
        login,
        updateUser
    }
}

const schema = makeExecutableSchema({typeDefs: fs.readFileSync(
        path.join('src', 'schema.graphql'), 'utf8'
    ), resolvers})

const server = new ApolloServer({
    schema,
    context: request => {
        return {
            ...request,
            models
        }
    },
});

await server.start();
const app = express()
server.applyMiddleware({app})

await new Promise(resolve => app.listen({ port: 4000 }, resolve));

console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
