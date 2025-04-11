import { AbstractLoggerFactory } from './logger.abstracts';
import { ILoggerService, LoggerName } from './logger.types'
import { LoggerService } from './logger.service';

export class LoggerFactory extends AbstractLoggerFactory {
  static create(loggerName: LoggerName): ILoggerService {
    return new LoggerService(loggerName);
  };
};