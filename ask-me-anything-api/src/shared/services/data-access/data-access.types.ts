export interface IDataAccessService {
  init: () => Promise<void>;
  close: () => Promise<void>;
};
