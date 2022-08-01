import { SectionId } from "../sections/Section";

export interface Task {
    id: String,
    sectionId: SectionId,
    title: String,
    description: String,
    done: Boolean,
    timeStamp: Number
};