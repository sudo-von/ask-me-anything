import pino from 'pino';
import { Logger } from './logger.types';
import { getEnvironmentVariables } from '@src/shared/environment-variables';

const { ENVIRONMENT } = getEnvironmentVariables();

const isProduction = ENVIRONMENT === 'production';
const isNotProduction = !isProduction;

/**
 * This logger is configured based on the environment.
 * In production, the logger outputs 'info' level logs and higher.
 * In non-production environments, the logger outputs 'debug' level logs.
 */
export class DefaultLogger implements Logger {
  private logger;

  constructor(app: string) {
    this.logger = pino({
      base: { app },
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
    });
  }

  debug(message: string, meta: object = {}): void {
    this.logger.debug(message, meta);
  }

  error(error: Error): void {
    this.logger.error(error);
  }

  fatal(error: Error): void {
    this.logger.fatal(error);
  }

  info(message: string, meta: object = {}): void {
    this.logger.info(message, meta);
  }

  trace(message: string, meta: object = {}): void {
    this.logger.trace(message, meta);
  }

  warn(message: string, meta: object = {}): void {
    this.logger.warn(message, meta);
  }
};