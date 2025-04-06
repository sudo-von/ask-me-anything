import pino from 'pino';
import { loggerOptions } from './constants';

export const getLogger = () => pino(loggerOptions);