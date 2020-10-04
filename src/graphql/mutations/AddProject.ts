import { db } from "../../../db";
import { MutationResolvers } from "../../types/graphql";

export const doAddProject = async (name: string, number: number) => {
  const addProjectToDB = () =>
    db.ref("projects").push({
      name: name,
      number: number,
    });
  console.log("adding project to db..");
  await addProjectToDB().catch((err) => {
    console.log(err);
  });

  console.log("project added..");
  return { name };
};

export const AddProject: MutationResolvers["AddProject"] = async (
  _root,
  { input }
) => {
  console.log(input);
  const { name, number } = input;
  return doAddProject(name, number);
};
