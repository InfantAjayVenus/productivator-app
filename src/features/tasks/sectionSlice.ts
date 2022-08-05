import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';
import {SectionId, SectionItem} from '../../types/Section';

export const DEFAULT_SECTION_ID = "ALL" as SectionId

export const sectionSlice = createSlice({
    name: "sections",
    initialState: {
        activeSectionId: DEFAULT_SECTION_ID as SectionId,
        sectionsList: [
            {
                id: DEFAULT_SECTION_ID as SectionId,
                name: "All Tasks" as String,
                timeStamp: Date.now()
            }
        ] as SectionItem[]
    },
    reducers: {
        setActiveSection: (state, action) => {
            const sectionId = action.payload;
            if(!state.sectionsList.some(({id}) => id === sectionId)) return;

            state.activeSectionId = sectionId;
        },
        addSection: (state, action) => {
            const newSectionName = action.payload;
            const newSection = {
                id: nanoid(),
                name: newSectionName,
                timeStamp: Date.now()
            }
            state.sectionsList = [...state.sectionsList, newSection];
            state.activeSectionId = newSection.id;
        },
        updateSection: (state, action) => {
            const {updateData} = action.payload;
            const {id: updateId} = updateData;

            const updateIndex = state.sectionsList.findIndex(({id}) => id === updateId);
            const updateObject = state.sectionsList[updateIndex];

            state.sectionsList[updateIndex] = {...updateObject, ...updateData};
        },
        deleteSection: (state, action) => {
            const deleteId = action.payload;

            state.sectionsList = state.sectionsList.filter(({id}) => id !== deleteId);
            state.activeSectionId = DEFAULT_SECTION_ID;
        }

    }
})

export const selectActiveSection = state => {
    return state.sections.sectionsList.find(({id}) => id === state.sections.activeSectionId)
};
export const selectSectionList = state => state.sections.sectionsList;

export const selectSectionById = createSelector(
    [
        state => state.sections.sectionsList,
        (_, sectionId) => sectionId
    ],
    (sectionsList, sectionId) => sectionsList.find(({id}) => sectionId === id)
)

export const { setActiveSection, addSection, updateSection, deleteSection } = sectionSlice.actions;

export default sectionSlice.reducer;