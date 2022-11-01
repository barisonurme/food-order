import { configureStore } from '@reduxjs/toolkit';

import uiControllerSlice from './uiControllerSlice';

export const store = configureStore({
  reducer: {
    uiController: uiControllerSlice,
  },
});

export default store;