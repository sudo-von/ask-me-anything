import { LoggerOptions } from 'pino';
import * as EnvironmentVariablesService from '@services/environment-variables';

const { ENVIRONMENT } = EnvironmentVariablesService.getEnvironmentVariables();

const isProduction = ENVIRONMENT === 'production';
const isNotProduction = !isProduction;

export const loggerOptions: LoggerOptions = {
  base: {
    app: 'ask-me-anything',
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