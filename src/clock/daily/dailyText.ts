import { sendText } from '../../services/twilio';

export const dailyText = () => {

    sendText({ to: '4783181282', body: 'Daily Text'} )
    return
}