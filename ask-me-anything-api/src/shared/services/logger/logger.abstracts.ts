import { ILoggerService, LoggerName } from "./logger.types";

export abstract class AbstractLoggerFactory {
  static create: (loggerName: LoggerName) => ILoggerService;
};