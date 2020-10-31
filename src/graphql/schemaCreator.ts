import * as fs from "fs";
import gql from "graphql-tag";
import { print } from "graphql";

const schema = gql`
  """
  Marathon Trainer Queries
  """
  type Query { 
    hello: String!
    }
  """
  Marathon Trainer Mutations
  """
  type Mutation {
    """
    Get all projects
    """
    AddSubscription(input: AddSubscriptionInput!): AddSubscriptionResponse
  }

  input AddSubscriptionInput {
    """
    The id of the customer to add the address to
    """
    phoneNumber: String!
    raceType: String!
    skillLevel: String!
  }

  type AddSubscriptionResponse {
    success: Boolean
  }

`;

function main() {
  const schemaString = print(schema);
  fs.writeFileSync("./schema.graphql", schemaString);
}

main();
