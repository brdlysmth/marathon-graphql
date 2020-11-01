import { isProduction, version } from '../../env';

// Must be before any absolute imports
import * as tsConfigPaths from 'tsconfig-paths';

const isBuiltCode = __dirname.includes('build');

const baseUrl = isBuiltCode ? './build' : './src';

tsConfigPaths.register({
  baseUrl,
  paths: {
    '~/*': ['*'],
  },
});


(function() {
  // Don't want this call to get hoisted
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { startCronJobs } = require('./cronJob');
  startCronJobs();
})();
