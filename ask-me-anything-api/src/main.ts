
import { DataAccessService } from '@services/data-access';
import { ApiService } from '@services/entry-points/api';
import { LoggerFactory } from '@services/logger';

const loggerService = LoggerFactory.create('main-service');

(async () => {
  const dataAccessService = new DataAccessService();
  const apiService = new ApiService();

  try {
    await dataAccessService.init();
    await apiService.init();
  } catch (e) {
    const error = e as Error;
    error.message = `Failed to start the main service: ${error.message}`;
    loggerService.fatal(error);

    try {
      console.info('Attempting to release resources.');
      await dataAccessService.close();
      await apiService.close();
    } catch (e) {
      const error = e as Error;
      error.message = `Failed to release resources: ${error.message}.`;
      loggerService.fatal(error);
    } finally {
      process.exit(1);
    }
  }
})();
