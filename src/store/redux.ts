import BookReducer from './slices/bookSlice';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { subscribeAndWatchBooks } from './sagas/bookSaga';
import { useDispatch } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();
interface iReducer {
  books: BookReducer;
}
export const store: any = configureStore({
  reducer: { books: BookReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(subscribeAndWatchBooks);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
