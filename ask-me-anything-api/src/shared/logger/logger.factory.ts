import { Logger } from './logger.types'
import { DefaultLogger } from './logger.default';

/**
 * Utility class responsible for creating instances of loggers.
 * It provides a centralized way to instantiate loggers for different applications or components.
 */
export class LoggerFactory {
  static create(app: string): Logger {
    return new DefaultLogger(app);
  };
};