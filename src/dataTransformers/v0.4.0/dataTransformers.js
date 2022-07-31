export const transformSection = (data) => {
    const {sections: {activeSection, sectionsList}={}} = data;

    if(!sectionsList) return data;
    if(sectionsList.some(({id}) => id === activeSection)) return data;

    activeSection = sectionsList[0];
    return {...data, sections: {activeSection, sectionsList}};
}

export const transformTasks = (data) => {
    const {tasks, sections: {activeSection}} = data;

    const tasksList = tasks.tasksList.map(taskItem => {
        if(taskItem.sectionId) return taskItem;

        return {...taskItem, sectionId: activeSection}
    })

    return {...data, tasks:{...tasks, tasksList}};
}