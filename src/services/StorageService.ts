import { DEFAULT_SECTION_ID } from "../features/tasks/sectionSlice";

const KEY = "PDTR_STORE";
export function loadState():any {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    const storeData = JSON.parse(serializedState);
    const validStore = getValidatStore(storeData);

    return validStore;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

function getValidatStore(storeData: any) {
  const {tasks, sections} = storeData;
  const sectionIdList = sections.sectionsList.map(({id}) => id);
  const validTasks = tasks.tasksList.map(task => {
    if(sectionIdList.includes(task.sectionId)) return task;
    return {...task, sectionId: DEFAULT_SECTION_ID}
  })

  return {sections, tasks: {...tasks, tasksList: validTasks}};
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
