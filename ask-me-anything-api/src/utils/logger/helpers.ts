import pino, { Logger } from 'pino';
import { loggerOptions } from './constants';

export const getLogger = (): Logger => pino(loggerOptions);