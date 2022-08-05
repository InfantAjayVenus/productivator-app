import { SectionId } from "./Section.d";

export interface Task {
    id: String,
    sectionId?: SectionId,
    title: String,
    description?: String,
    done: Boolean,
    timeStamp: Number,
    dueDateStamp?: Number
};