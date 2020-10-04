"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var graphql_import_1 = require("graphql-import");
var typeDefs = graphql_import_1.importSchema("schema.graphql");
var resolvers_1 = __importDefault(require("./src/graphql/resolvers"));
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers_1.default });
// The `listen` method launches a web server.
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("\uD83D\uDE80  Server ready at " + url);
});
