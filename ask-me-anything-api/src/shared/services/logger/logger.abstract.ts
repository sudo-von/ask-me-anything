import { ILoggerService, LoggerModule } from "./logger.types";

/**
 * Abstract base class for creating logger service instances.
 *
 * This factory provides a static `create` method that returns an `ILoggerService`
 * implementation, scoped to a specific module or file.
 *
 * Intended to be extended or implemented by concrete logger factories that handle
 * configuration, transport setup, formatting, etc.
 */
export abstract class AbstractLoggerFactory {
  static create: (loggerModule: LoggerModule) => ILoggerService;
};