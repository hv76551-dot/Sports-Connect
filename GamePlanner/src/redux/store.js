import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import Constants from '../common/Constants';

const isDevelopment = Constants.ISDEVELOPMENT === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    isDevelopment
      ? getDefaultMiddleware()
      : getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});

export default store;
