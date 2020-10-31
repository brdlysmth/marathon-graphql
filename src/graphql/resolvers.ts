import { Resolvers } from "../types/graphql";

// Queries

// Mutations
import { AddSubscription } from "./mutations/AddSubscription";

// Types
import { AddSubscriptionResponse } from "../graphql/types/AddSubscriptionReponse";

const resolvers: Resolvers = {
  Query: {
     hello: String!
  },
  Mutation: {
    AddSubscription,
  },
  AddSubscriptionResponse,
};

export default resolvers;
