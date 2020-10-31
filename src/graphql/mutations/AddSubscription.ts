import { db } from "../../../db";
import { MutationResolvers } from "../../types/graphql";

export const doAddSubscription = async (phoneNumber: string, raceType: string, skillLevel: string) => {
  const addSubscriptionToDB = () =>
    db.ref("subscriptions").push({
      phoneNumber: phoneNumber,
      raceType: raceType,
      skillLevel: skillLevel
    });
  console.log("adding project to db..");
  await addSubscriptionToDB().catch((err) => {
    console.log(err);
  });

  console.log("Subscription added..");
  return { success: true };
};

export const AddSubscription: MutationResolvers["AddSubscription"] = async (
  _root,
  { input }
) => {
  console.log(input);
  const { phoneNumber, raceType, skillLevel } = input;
  return doAddSubscription(phoneNumber, raceType, skillLevel);
};