import { db, getVal } from "../../../db";
import { QueryResolvers } from "../../types/graphql";

export const ProjectBaseResolver = async (
  id: string
): Promise<Firebase.Project> => {
  console.log(id);
  const project = await getVal(db.ref("projects").child(id));
  console.log(project);
  if (!project) throw Error(`Project ${id} does not exist`);
  return project;
};

export const Project: QueryResolvers["Project"] = async (_root, { input }) => {
  console.log(input);
  const { id } = input;
  return ProjectBaseResolver(id);
};
