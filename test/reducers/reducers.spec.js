import { createStore } from 'redux';
import { createHashHistory } from 'history';
import { connectRouter } from 'connected-react-router';
import createRootReducer from '../../app/reducers';
import storage from '../../app/reducers/storage';

describe('reducers', () => {
  describe('createRootReducer', () => {
    const history = createHashHistory();
    const rootReducer = createRootReducer(history);
    const store = createStore(rootReducer);

    it('includes storage reducer', () => {
      expect(store.getState().storage).toEqual(storage(undefined, {}));
    });

    it('includes router reducer', () => {
      expect(store.getState().router).toEqual(
        connectRouter(history)(undefined, {})
      );
    });
  });
});
