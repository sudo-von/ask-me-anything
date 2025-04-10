/**
 * Defines the contract for logging methods.
 * Each method corresponds to a specific logging level.
 */
export type Logger = {
  debug(message: string, meta?: object): void;
  error(error: Error): void;
  fatal(error: Error): void;
  info(message: string, meta?: object): void;
  trace(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
};