import { AbstractLoggerFactory } from './logger.abstract';
import { ILoggerService, LoggerModule } from './logger.types'
import { LoggerService } from './logger.service';

export class LoggerFactory extends AbstractLoggerFactory {
  static create(loggerModule: LoggerModule): ILoggerService {
    return new LoggerService(loggerModule);
  };
};