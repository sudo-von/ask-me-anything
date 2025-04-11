import { ILoggerService } from './logger.types'
import { LoggerService } from './logger.service';

export class LoggerFactory {
  static create(app: string): ILoggerService {
    return new LoggerService(app);
  };
};