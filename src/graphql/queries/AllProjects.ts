import { db, getVal, getValShallow } from "../../../db";
import { QueryResolvers } from "../../types/graphql";
import { ProjectBaseResolver } from "./Project";

export const AllProjects: QueryResolvers["AllProjects"] = async (_root) => {
  const projects = await getValShallow(db.ref("projects"));
  const allProjectIds = Object.keys(projects || {});
  const allProjects = await Promise.all(
    allProjectIds.map((pid) => ProjectBaseResolver(pid))
  );

  return allProjects;
};
