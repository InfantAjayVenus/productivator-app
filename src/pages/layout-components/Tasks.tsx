import React from "react";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  List,
  Group,
  Menu,
} from "@mantine/core";
import { useFocusTrap, useFocusReturn } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { Dots, Plus, Trash } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksList } from "../../features/tasks/taskSlice";
import { Flipped, Flipper } from "react-flip-toolkit";
import TaskItem from "../components/TaskItem";
import { Task } from '../../types/Task';
import { FlipId } from "flip-toolkit/lib/types";

import { DEFAULT_SECTION_ID, deleteSection, selectActiveSection } from "../../features/tasks/sectionSlice";

export default function Tasks() {
  const form = useForm({
    initialValues: {
      task: '',
    },
    validate: {
      task: (value) => value.trim().length ? null : "Task title must not be empty"
    }
  })

  const focusRef = useFocusTrap(true);
  const focusReturn = useFocusReturn({ opened: true });
  const activeSection = useSelector(selectActiveSection);
  const taskList: Task[] = useSelector((state) => selectTasksList(state, activeSection.id));

  const dispatch = useDispatch();
  return (
    <>
      <Container p={'md'}>
        <Group position="apart">
          <Title order={4}>{activeSection.name}</Title>
          {activeSection.id !== DEFAULT_SECTION_ID && (
            <Menu withinPortal position="bottom-end">
              <Menu.Target><ActionIcon><Dots /></ActionIcon></Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<Trash />}
                  color={'red'}
                  onClick={() => dispatch(deleteSection(activeSection.id))}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
        <form
          onSubmit={form.onSubmit(({ task }) => {
            dispatch(addTask({ title: task, sectionId: activeSection.id }));
            form.reset();
            focusReturn();
          })}
        >
          <TextInput
            ref={focusRef}
            {...form.getInputProps('task')}
            placeholder="Enter task here"
            style={{ width: "100%", padding: "0.25rem 0.5rem" }}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required
          />
        </form>
        <ScrollArea.Autosize maxHeight={'72.5vh'} px={'xs'}>
          <Flipper flipKey={taskList.map(({ id }) => id).join('')}>
            <List listStyleType={'none'} my={'xs'}>
              {taskList
                .map(taskItem => (
                  <Flipped flipId={taskItem.id as FlipId} key={taskItem.id as React.Key}>
                    <List.Item key={taskItem.id as React.Key}>
                      <TaskItem task={taskItem} />
                    </List.Item>
                  </Flipped>
                ))}
            </List>
          </Flipper>
        </ScrollArea.Autosize>
      </Container>
    </>
  );
}
