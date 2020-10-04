import { Resolvers } from "../types/graphql";

// Queries
import { AllProjects } from "../graphql/queries/AllProjects";
import { Project } from "../graphql/queries/Project";

// Mutations
import { AddProject } from "../graphql/mutations/AddProject";

// Types
import { AddProjectResponse } from "../graphql/types/AddProjectReponse";

const resolvers: Resolvers = {
  Query: {
    AllProjects,
    Project,
  },
  Mutation: {
    AddProject,
  },
  AddProjectResponse,
};

export default resolvers;
