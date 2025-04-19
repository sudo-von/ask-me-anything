import Module from 'module';

/**
 * This interface serves as a facade over an underlying logging system.
 * Allows the rest of the application to interact with a unified and decoupled logging API.
 */
export interface ILoggerService {
  /**
   * Logs a debug-level message.
   * @param message - The main log message.
   * @param metadata - Optional metadata to include.
   */
  debug(message: string, metadata?: Metadata): void;

  /**
   * Logs an error-level message.
   * @param error - The error instance to log.
   */
  error(error: Error): void;

  /**
   * Logs a fatal-level message.
   * @param error - The error instance to log.
   */
  fatal(error: Error): void;

  /**
   * Formats a log message with an icon and optional metadata.
   * @param type - The logger type representing the log level.
   * @param message - The main log message.
   * @param metadata - Optional metadata to include.
   * @returns The formatted message.
   */
  format(type: LoggerType, message: string, metadata?: Metadata): string;

  /**
   * Logs an info-level message.
   * @param message - The message to log.
   * @param metadata - Optional metadata to include.
   */
  info(message: string, metadata?: Metadata): void;

  /**
   * Logs a trace-level message (detailed execution flow).
   * @param message - The message to log.
   * @param metadata - Optional metadata to include.
   */
  trace(message: string, metadata?: Metadata): void;

  /**
   * Logs a warning-level message.
   * @param message - The message to log.
   * @param metadata - Optional metadata to include.
   */
  warn(message: string, metadata?: Metadata): void;
};

/**
 * Emoji icons used to visually differentiate log levels.
 */
export type LoggerIcon = '🐛' | '❌' | '💀' | '🔍' | '🧵' | '⚠️';

/**
 * A mapping between each logger type and its corresponding icon.
 */
export type LoggerIcons = Record<LoggerType, LoggerIcon>;

/**
 * A type alias representing a module.
 */
export type LoggerModule = Module;

/**
 * Represents the severity level or type of a log message.
 */
export type LoggerType = 'debug' | 'error' | 'fatal' | 'info' | 'trace' | 'warn';

/**
 * A generic shape for log metadata, allowing any value.
 */
export type Metadata = unknown;