import { createSelector, createSlice } from "@reduxjs/toolkit";
import { DEFAULT_SECTION_ID } from "./sectionSlice";
import {Task} from '../../types/Task';

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasksList: [],
  },
  reducers: {
    updateTaskList: (state, action) => {
      state.tasksList = action.payload;
    },
    addTask: (state, action) => {
      const {sectionId, title} = action.payload;
      const newTask = {
        id: Date.now().toString(),
        sectionId,
        title,
        description: "",
        done: false,
        timeStamp: Date.now(),
      };
      const { tasksList } = state;
      state.tasksList = [newTask, ...tasksList];
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      const newTasks = state.tasksList.map((taskItem) => {
        if (taskItem.id !== updateTask.id) return taskItem;

        return {...taskItem, ...updateTask};
      });

      const newTodoTasks = newTasks
        .filter(({ done }) => !done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp - comparingTask.timeStamp
        );
      const newDoneTasks = newTasks
        .filter(({ done }) => done)
        .sort(
          (comparingTask, comparedTask) =>
            comparedTask.timeStamp - comparingTask.timeStamp
        );

      state.tasksList = [...newTodoTasks, ...newDoneTasks] as Task[];
    },
    deleteTask: (state, action) => {
      const deleteId = action.payload;
      state.tasksList = state.tasksList.filter(({ id }) => id !== deleteId);
    },
  },
  extraReducers: {
    "sections/deleteSection": (state, action) => {
      const deletedSectionId = action.payload
      state.tasksList = state.tasksList.map(taskItem => {
        if(taskItem.sectionId !== deletedSectionId) return taskItem;
        
        return {...taskItem ,sectionId: DEFAULT_SECTION_ID};
      })
    },
  }
});

export const selectTasksList = createSelector([
  (state) => state.tasks.tasksList,
  (_, sectionId) => sectionId,
], (tasksList, sectionId) => {
  return tasksList.filter(({sectionId: itemSectionId}) => itemSectionId === sectionId);
});

export const selectTaskById = createSelector(
  [selectTasksList, (_, taskId) => taskId],
  (tasks, taskId) => tasks.find(({ id }) => taskId === id)
);

export const { addTask, deleteTask, updateTaskList, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
