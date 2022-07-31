import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

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
      const {title, sectionId} = action.payload;
      const newTask = {
        id: nanoid(),
        title,
        description: "",
        done: false,
        timeStamp: Date.now(),
        sectionId
      };
      const { tasksList: tasks } = state;
      state.tasksList = [newTask, ...tasks];
    },
    updateTask: (state, action) => {
      const updateTask = action.payload;
      const newTasks = state.tasksList.map((taskItem) => {
        if (taskItem.id !== updateTask.id) return taskItem;

        return {...taskItem , ...updateTask};
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

      state.tasksList = [...newTodoTasks, ...newDoneTasks];
    },
    deleteTask: (state, action) => {
      const deleteId = action.payload;
      state.tasksList = state.tasksList.filter(({ id }) => id !== deleteId);
    },
  },
});

export const selectTasksListBySection = createSelector(
  [
    state => state.tasks.tasksList,
    (state, sectionId) => sectionId
  ],
  (taskList, activeSectionId) => taskList.filter(({sectionId}) => sectionId === activeSectionId)
);

export const selectTaskById = createSelector(
  [state => state.tasks.tasksList, (state, taskId) => taskId],
  (tasks, taskId) => tasks.find(({ id }) => taskId === id)
);

export const { addTask, deleteTask, updateTaskList, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
