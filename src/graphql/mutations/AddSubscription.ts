import { db } from "../../../db";
import { MutationResolvers } from "../../types/graphql";
import { sendText } from '../../services/twilio';

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
  sendFirstText()
  return { success: true };
};

export const sendFirstText = () => {
  return sendText({
    to: '4783181282',
    body: 'Subscription created! You are not subscribed yet, but this is what a confirmation text will look like. This project is moving.'
  })
}

export const AddSubscription: MutationResolvers["AddSubscription"] = async (
  _root,
  { input }
) => {
  console.log(input);
  const { phoneNumber, raceType, skillLevel } = input;
  return doAddSubscription(phoneNumber, raceType, skillLevel);
};
