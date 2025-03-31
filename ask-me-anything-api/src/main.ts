import * as App from 'app';

(async () => {
  try {
    await App.start();
  } catch (e) {
    const error = e as Error;
    console.error(error);
    try {
      await App.release();
    } catch (e) {
      const error = e as Error;
      console.error(error);
    } finally {
      process.exit(1);
    }
  }
})();
