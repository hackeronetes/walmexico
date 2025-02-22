import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authReducer'
import fileUploadReducer from './fileUploadReducer';
import excessPropertyReducer from './excessPropertyReducer';
import loaderReducer from './loaderReducer';
import NotasReducer  from './notasReducer';
import SearchHistoryReducer  from './searchHistoryReducer';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    fileUpload: fileUploadReducer,
    excessProp: excessPropertyReducer,
    loader: loaderReducer,
    notas: NotasReducer,
    searchHistory: SearchHistoryReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

 