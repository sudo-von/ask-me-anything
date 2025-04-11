export interface IService {
  init: () => Promise<void>;
  close: () => Promise<void>;
};
