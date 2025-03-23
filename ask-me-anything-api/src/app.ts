import * as App from './infrastructure/app';


(async () => {
  try {
    await App.start();
  } catch (error) {
    App.close(error);
    process.exit(1);
  }
})();