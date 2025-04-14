/**
 * Base service interface that provides essential methods for service lifecycle management.
 */
export interface IService {
  /**
   * Initializes the service asynchronously.
   * @returns A promise that resolves once the initialization is complete.
   */
  init: () => Promise<void>;

  /**
   * Closes the service asynchronously.
   * This method is typically used for clean-up tasks, 
   * releasing resources, or saving final states before the service is terminated.
   * @returns A promise that resolves once the service has been successfully closed.
   */
  close: () => Promise<void>;
};