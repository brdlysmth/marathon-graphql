import { AddProjectResponseResolvers } from "../../types/graphql";

export const AddProjectResponse: AddProjectResponseResolvers = {
  name: (e) => e.name,
};
