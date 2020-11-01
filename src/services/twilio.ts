import { isProduction } from '../../env';
import { Twilio } from 'twilio';
import { twilioCert } from '../../cert'

const twilioSID = twilioCert.sid;
const twilioToken = twilioCert.token;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let twilio: Twilio;

function getTwilio() {
  if (!twilio) twilio = new Twilio(twilioSID, twilioToken);
  return twilio;
}

export const sendText = async ({
  to,
  body,
}: {
  to: string;
  body: string;
}) => {
  const twilio = getTwilio();
  return twilio.messages.create({
        body,
        to,
        from: '+12058835886',
      })
      .catch((err: Error) => {
        console.log(`ERROR (twilio): ${to} => ${err.toString()}`);
        throw err;
      });
};
