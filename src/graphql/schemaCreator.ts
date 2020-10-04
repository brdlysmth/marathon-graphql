import * as fs from "fs";
import gql from "graphql-tag";
import { print } from "graphql";

const schema = gql`
  """
  Smart Submittals Queries
  """
  type Query {
    """
    Get all projects
    """
    AllProjects: [Project!]!
    """
    Get a single project
    """
    Project(input: GetProjectInput!): Project!
  }

  """
  Smart Submittals Queries
  """
  type Mutation {
    """
    Get all projects
    """
    AddProject(input: AddProjectInput!): AddProjectResponse
  }

  input AddProjectInput {
    """
    The id of the customer to add the address to
    """
    name: String!
    number: Int!
  }

  type AddProjectResponse {
    name: String
  }

  input GetProjectInput {
    id: String!
  }

  type Project {
    name: String!
    number: Int!
  }
`;

function main() {
  const schemaString = print(schema);
  fs.writeFileSync("./schema.graphql", schemaString);
}

main();
