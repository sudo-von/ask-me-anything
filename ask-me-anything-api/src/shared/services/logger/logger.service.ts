import util from 'util';
import pino, { Logger } from 'pino';
import {
  ILoggerService,
  LoggerIcons,
  LoggerModule,
  LoggerType,
  Metadata,
} from './logger.types';
import { ConfigurationService } from '@services/configuration';

const configurationService = new ConfigurationService();
const environment = configurationService.get('ENVIRONMENT');
const isProduction = environment === 'production';
const isNotProduction = !isProduction;

export class LoggerService implements ILoggerService {
  private logger: Logger;
  private loggerIcons: LoggerIcons;

  constructor(loggerModule: LoggerModule) {
    const colorize = isNotProduction;
    const level = isProduction ? 'info' : 'debug';
    const target = isNotProduction ? 'pino-pretty' : '';

    this.logger = pino({
      base: { app: loggerModule.filename },
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

    this.loggerIcons = {
      debug: '🐛',
      error: '❌',
      fatal: '💀',
      info: '🔍',
      trace: '🧵',
      warn: '⚠️',
    };
  }

  debug(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format('debug', message, metadata);
    this.logger.debug(formattedMessage);
  }

  error(error: Error): void {
    const metadata: Metadata = { stack: error.stack };
    const formattedMessage = this.format('error', error.message, metadata);
    this.logger.error(formattedMessage, { error });
  }

  fatal(error: Error): void {
    const metadata: Metadata = { stack: error.stack };
    const formattedMessage = this.format('fatal', error.message, metadata);
    this.logger.fatal(formattedMessage, { error });
  }

  format(type: LoggerType, message: string, metadata?: Metadata): string {
    const loggerIcon = this.loggerIcons[type];

    if (!metadata) {
      return `${loggerIcon} ${message}`;
    }

    let formattedMetadata = '';
    switch (typeof metadata) {
      case 'boolean':
        formattedMetadata = metadata ? 'true' : 'false';
        break;
      case 'number':
        formattedMetadata = String(metadata);
        break;
      case 'object':
        formattedMetadata = util.inspect(metadata, { depth: null, showHidden: false });
        break;
      case 'string':
        formattedMetadata = metadata;
        break;
      default:
        formattedMetadata = `[Invalid metadata type: ${typeof metadata}]`;
    }

    return `${loggerIcon} ${message} ${formattedMetadata}`
  }

  info(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format('info', message, metadata);
    this.logger.info(formattedMessage);
  }

  trace(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format('trace', message, metadata);
    this.logger.trace(formattedMessage);
  }

  warn(message: string, metadata?: Metadata): void {
    const formattedMessage = this.format('warn', message, metadata);
    this.logger.debug(formattedMessage);
  }
}
