import { runDataVersionTransfroms } from '../dataTransformers'

const KEY = "PDTR_STORE";
export function loadState():any {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;

    const loadedData = JSON.parse(serializedState);
    const transformedData = runDataVersionTransfroms(loadedData);

    return transformedData;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}
