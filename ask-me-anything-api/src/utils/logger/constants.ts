import { LoggerOptions } from 'pino';
import { getEnvironmentVariables } from '@services/environment-variables';

const { ENVIRONMENT } = getEnvironmentVariables();

const isProduction = ENVIRONMENT === 'production';
const isNotProduction = !isProduction;

export const loggerOptions: LoggerOptions = {
  base: {
    app: 'ask-me-anything-api',
  },
  level: isProduction ? 'info' : 'debug',
  transport: {
    target: isNotProduction ? 'pino-pretty' : '',
    options: {
      colorize: isNotProduction,
      hideObject: true,
      ignore: 'pid',
      levelFirst: true,
      translateTime: 'yyyy-mm-dd hh:mm:ss',
      timestampKey: 'time',
    },
  },
};