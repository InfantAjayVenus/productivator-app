import React from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { FlipId } from "flip-toolkit/lib/types";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  List,
  ScrollArea,
  Group,
  Menu,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useFocusTrap } from "@mantine/hooks";
import { Dots, Plus, Trash } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksListBySection } from "./taskSlice";
import TaskItem from './components/TaskItem';
import { Task } from './Task.d'
import { deleteSection, selectActiveSection } from "../sections/sectionSlice";

export function Tasks() {
  const form = useForm({
    initialValues: {
      task: '',
    },
    validate: {
      task: (value) => value.length ? null : "Task should not be empty"
    }
  })
  const sectionInfo = useSelector(selectActiveSection);
  const taskList = useSelector((state) => selectTasksListBySection(state, sectionInfo.id)) as Task[];
  const focusRef = useFocusTrap(true);
  const dispatch = useDispatch();
  return (
    <>
      <Container p={'md'}>
        <Group position="apart" my={'xs'}>
          <Title order={2}>{sectionInfo.name}</Title>
          <Menu>
            <Menu.Target>
              <ActionIcon><Dots /></ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<Trash />} color={'red'} onClick={() => {dispatch(deleteSection(sectionInfo.id))}}>Delete</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <form
          ref={focusRef}
          onSubmit={form.onSubmit(({ task }) => {
            dispatch(addTask({ title: task, sectionId: sectionInfo.id }));
            form.reset();
          })}
        >
          <TextInput
            data-autofocus
            placeholder="Enter task here"
            style={{ width: "100%", padding: "0.25rem 0.5rem" }}
            {...form.getInputProps('task')}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required />
        </form>
        <ScrollArea style={{ height: "75vh" }} px={'xs'}>
          <Flipper flipKey={taskList.map(({ timeStamp }) => timeStamp).join('')}>
            <List listStyleType={'none'}>
              {taskList
                .map(taskItem => (
                  <Flipped key={taskItem.id as React.Key} flipId={taskItem.id as FlipId}>
                    <List.Item key={taskItem.id as React.Key}>
                      <TaskItem task={taskItem} />
                    </List.Item>
                  </Flipped>
                ))}
            </List>
          </Flipper>
        </ScrollArea>
      </Container>
    </>
  );
}
