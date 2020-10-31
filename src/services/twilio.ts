import { isProduction } from '../../env';
import { Twilio } from 'twilio';

const twilioSID = 'AC2ec971367897aeb5ad20fbdaea45f13a';
const twilioToken = '4ae92a9c99a8156308e0d50fcde87d73';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let twilio: Twilio | undefined;

function getTwilio() {
  if (!twilio) twilio = new Twilio(twilioSID, twilioToken);
  return twilio;
}

export const sendText = ({
  to,
  body,
}: {
  to: string;
  body: string;
  justSendToSlack?: boolean;
}) => {
  return getTwilio()
    .messages.create({
        body,
        to,
        from: '+12058835886',
      })
      .catch((err: Error) => {
        console.log(`ERROR (twilio): ${to} => ${err.toString()}`);
        throw err;
      });
};
