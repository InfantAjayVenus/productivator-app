import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';
import sectionReducer from '../features/sections/sectionSlice';
import {loadState} from '../services/StorageService';

export const store = configureStore({
  reducer: {
    sections: sectionReducer,
    tasks: taskReducer
  },
  preloadedState: loadState()
});
