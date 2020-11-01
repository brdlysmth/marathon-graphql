import { CronJob } from 'cron';

import { dailyText } from './daily/dailyText';


/* eslint-disable @typescript-eslint/ban-ts-ignore */

// TODO: customize cron job start time
// TODO: customize time zone

export function startCronJobs() {
  // @ts-ignore
  const sendDaily = new CronJob({
    // at 5:05 AM EST 
    cronTime: '5 5 * * *',
    onTick: dailyText,
    start: true,
    timeZone: 'America/New_York',
  });

}
