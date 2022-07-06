import { createSelector, createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    updateTaskList: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now().toString(),
        title: action.payload,
        description: '',
        done: false,
      };
      const { tasks } = state;
      state.tasks = [newTask, ...tasks];
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      state.tasks = state.tasks.map((taskItem) => {
        if (taskItem.id !== updateTask.id) return taskItem;

        return updateTask;
      });
    },
    toggleDone: (state, action) => {
      const updateId = action.payload;
      state.tasks = state.tasks.map((taskItem) => {
        if (taskItem.id !== updateId) return taskItem;

        const { done: currentDone } = taskItem;
        return { ...taskItem, done: !currentDone };
      });
    },
    deleteTask: (state, action) => {
      const deleteId = action.payload;
      state.tasks = state.tasks.filter(({ id }) => id !== deleteId);
    },
  },
});

export const selectTasksList = (state) => state.tasks.tasks;

const selectTaskId = (state, taskId) => taskId;
export const selectTaskById = createSelector(
  [selectTasksList, selectTaskId],
  (tasks, taskId) => tasks.find(({ id }) => taskId === id)
);

export const { addTask, toggleDone, deleteTask, updateTaskList, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
