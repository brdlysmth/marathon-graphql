import { CronJob } from 'cron';
import { CompositionHookList } from 'twilio/lib/rest/video/v1/compositionHook';

import { dailyText } from './daily/dailyText';


/* eslint-disable @typescript-eslint/ban-ts-ignore */

// TODO: customize cron job start time
// TODO: customize time zone

export function startCronJobs() {
  console.log('Starting cron jobs...');
  // @ts-ignore
  const sendDaily = new CronJob({
    // at 5:05 AM EST 
    cronTime: '15 5 * * *',
    onTick: dailyText,
    start: true,
    timeZone: 'America/New_York',
  });

}
