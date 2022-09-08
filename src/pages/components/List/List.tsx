import React from 'react'
import { ScrollArea, List as MantineList} from '@mantine/core'
import { FlipId } from 'flip-toolkit/lib/types';
import { Flipped, Flipper } from 'react-flip-toolkit'
import ListItem from '../List/ListItem'
import { Task } from '../../../types/Task';
import { SectionId } from '../../../types/Section';

interface ListProps {
    taskList: Task[],
    activeSection: SectionId
};

function List({taskList, activeSection}: ListProps) {
    return (
        <ScrollArea.Autosize maxHeight={'70.5vh'} px={'xs'}>
            <Flipper flipKey={taskList.map(({ id }) => id).join('')}>
                <MantineList listStyleType={'none'} my={'xs'}>
                    {taskList
                        .map(taskItem => (
                            <Flipped flipId={taskItem.id as FlipId} key={taskItem.id as React.Key}>
                                <MantineList.Item key={taskItem.id as React.Key}>
                                    <ListItem section={activeSection} task={taskItem} />
                                </MantineList.Item>
                            </Flipped>
                        ))}
                </MantineList>
            </Flipper>
        </ScrollArea.Autosize>
    )
}

export default List;