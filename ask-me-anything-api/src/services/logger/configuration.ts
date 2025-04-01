import pino from 'pino';
import { EnvironmentVariables } from '@utils';

const { ENVIRONMENT } = EnvironmentVariables.VARIABLES;

export const getLogger = () => {
  return pino({
    base: {
      app: 'ask-me-anything',
    },
    level: ENVIRONMENT === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: ENVIRONMENT === 'development',
        hideObject: true,
        ignore: 'pid',
        levelFirst: true,
        messageKey: 'message',
        translateTime: 'SYS:YYYY-MM-DDTHH:mm:ss.sssZ',
        timestampKey: 'time',
      },
    },
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
  });
};
