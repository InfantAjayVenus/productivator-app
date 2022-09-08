import React from "react";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  List,
  Menu,
  Stack,
  Center,
  Grid,
} from "@mantine/core";
import { useFocusTrap, useFocusReturn } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { DotsVertical, Plus, Trash } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { addTask, selectTasksList } from "../features/tasks/taskSlice";
import { Flipped, Flipper } from "react-flip-toolkit";
import TaskItem from "./components/TaskItem";
import { Task } from '../types/Task';
import { FlipId } from "flip-toolkit/lib/types";

import { DEFAULT_SECTION_ID, deleteSection, selectSectionById } from "../features/tasks/sectionSlice";

export default function Tasks() {
  const { sectionId = DEFAULT_SECTION_ID } = useParams();
  const navigate = useNavigate();

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
  const activeSection = useSelector((state) => selectSectionById(state, sectionId));

  const taskList: Task[] = useSelector((state) => selectTasksList(state, activeSection.id));

  const dispatch = useDispatch();
  return (
    <>
      <Container px={0}>
        <Stack p={'md'} style={{ borderTop: sectionId !== DEFAULT_SECTION_ID ? `0.5rem solid ${activeSection.accent || 'gray'}` : '' }}>
          <Center>
            <Title order={4} align="center" >{activeSection.name}</Title>
          </Center>
          <Grid gutter={0} style={{width: '100%'}}>
            <Grid.Col span={11}>
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
            </Grid.Col>
            <Grid.Col span={1}>
              <Menu withinPortal position="bottom-end">
                <Menu.Target>
                  <ActionIcon style={{ maxWidth: '3rem', height: '100%' }}><DotsVertical /></ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<Trash />}
                    color={'red'}
                    onClick={() => {
                      navigate('/tasks', { replace: true });
                      dispatch(deleteSection(activeSection.id))
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Grid.Col>
          </Grid>
        </Stack>
        <ScrollArea.Autosize maxHeight={'70.5vh'} px={'xs'}>
          <Flipper flipKey={taskList.map(({ id }) => id).join('')}>
            <List listStyleType={'none'} my={'xs'}>
              {taskList
                .map(taskItem => (
                  <Flipped flipId={taskItem.id as FlipId} key={taskItem.id as React.Key}>
                    <List.Item key={taskItem.id as React.Key}>
                      <TaskItem section={activeSection} task={taskItem} showGroup={sectionId === DEFAULT_SECTION_ID && taskItem.sectionId !== DEFAULT_SECTION_ID} />
                    </List.Item>
                  </Flipped>
                ))}
            </List>
          </Flipper>
        </ScrollArea.Autosize>
      </Container>
      <Outlet />
    </>
  );
}
