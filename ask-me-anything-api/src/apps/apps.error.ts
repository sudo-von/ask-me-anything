/**
 * Base error for all apps-related exceptions.
 * Can be extended to create consistent and domain-specific error types across the application.
 */
export class AppsBaseError extends Error {
  constructor(message: string) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Thrown when a method is intentionally not implemented yet.
 * Useful for abstract base classes, stubs, or unfinished features.
 */
export class MethodNotImplementedYetError extends AppsBaseError {
  constructor(methodName: string) {
    super(`Method '${methodName}' not implemented yet.`);
  }
}

/**
 * Thrown when a service cannot be started.
 * This can be used to represent situations where a service fails to initialize,
 * perhaps due to missing dependencies, misconfigurations, or other startup issues.
 */
export class ServiceInitializationError extends AppsBaseError {
  constructor(serviceName: string, reason: string) {
    super(`Failed to initialize the service '${serviceName}'. Reason: ${reason}`);
  }
}