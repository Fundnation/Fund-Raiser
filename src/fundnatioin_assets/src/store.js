import { configureStore } from '@reduxjs/toolkit';
import createProjectSlice from './components/features/createProjectSlice';

export const store = configureStore({
    reducer: {
       create: createProjectSlice
    },
  });