import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { phonebookApi } from './phonebook/phonebook-slice';

export const store = configureStore({
  reducer: {
    [phonebookApi.reducerPath]: phonebookApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    phonebookApi.middleware,
  ],
});

setupListeners(store.dispatch);
