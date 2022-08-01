import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import sectionReducer from '../features/sections/sectionSlice';
import {loadState} from '../services/StorageService.ts';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    sections: sectionReducer,
  },
  preloadedState: loadState()
});
