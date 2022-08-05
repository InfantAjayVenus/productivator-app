export interface Section {
    activeSectionId: String,
    sectionsList: SectionItem[]
};

export declare type SectionId = String;

export interface SectionItem {
    id: SectionId,
    name: String,
    timeStamp: Number
};