import { sendText } from '../../services/twilio';

export const dailyText = async () => {
    return await sendText({ to: '4783181282', body: 'Daily Text'} )
}