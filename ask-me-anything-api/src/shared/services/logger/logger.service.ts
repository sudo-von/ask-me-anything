import pino, { Logger } from 'pino';
import { ILoggerService } from './logger.types';
import { ConfigurationService } from '@services/configuration';

const configurationService = new ConfigurationService();
const environment = configurationService.get('ENVIRONMENT');
const isProduction = environment === 'production';
const isNotProduction = !isProduction;

export class LoggerService implements ILoggerService {
  private logger: Logger;

  constructor(app: string) {
    const colorize = isNotProduction;
    const level = isProduction ? 'info' : 'debug';
    const target = isNotProduction ? 'pino-pretty' : '';

    this.logger = pino({
      base: { app },
      level,
      transport: {
        target,
        options: {
          colorize,
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
    this.logger.debug(`🐛 ${message}`, meta);
  }

  error(error: Error): void {
    this.logger.error(`❌ ${error.message}`, { stack: error.stack, error });
  }

  fatal(error: Error): void {
    this.logger.fatal(`💀 ${error.message}`, { stack: error.stack, error });
  }

  info(message: string, meta: object = {}): void {
    this.logger.info(`ℹ️ ${message}`, meta);
  }

  trace(message: string, meta: object = {}): void {
    this.logger.trace(`🔍 ${message}`, meta);
  }

  warn(message: string, meta: object = {}): void {
    this.logger.warn(`⚠️ ${message}`, meta);
  }
};