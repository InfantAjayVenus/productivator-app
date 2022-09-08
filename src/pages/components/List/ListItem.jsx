import React, { useState } from "react";
import {
  ActionIcon,
  Checkbox,
  Container,
  createStyles,
  Drawer,
  Group,
  Indicator,
  Menu,
  Stack,
  Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../../../features/tasks/taskSlice";
import { AlignRight, ArrowsDiagonal, Dots, Trash } from "tabler-icons-react";
import ViewTask from "../ViewTask";
import { useDisclosure } from "@mantine/hooks";
import {
  DEFAULT_SECTION_ID,
  selectSectionById,
} from "../../../features/tasks/sectionSlice";

const useContainerStyles = createStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.colors.dark[4]}`,

    "&:hover": {
      backgroundColor: theme.colors.dark[6],
    },
  },
}));

const TaskItem = ({ task, showGroup = false }) => {
  const [drawState, drawHandlers] = useDisclosure(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const { classes } = useContainerStyles();

  const {
    id,
    title,
    description,
    done,
    dueDateStamp,
    sectionId = DEFAULT_SECTION_ID,
  } = task;
  const section = useSelector((state) => selectSectionById(state, sectionId));
  const dueDate = !isNaN(dueDateStamp) ? new Date(dueDateStamp) : null;
  return (
    <>
      <Drawer
        opened={drawState}
        title={`View Task`}
        size="xl"
        padding="xl"
        position="right"
        onClose={drawHandlers.close}
      >
        {drawState && (
          <ViewTask
            {...{ task, isEdit, setEdit, drawToggle: drawHandlers.toggle }}
          />
        )}
      </Drawer>
      <Container py={"xs"} px={"sm"} tabIndex={0} className={classes.container}>
        <Group position="apart" noWrap>
          <Group>
            <Checkbox
              checked={done}
              onChange={() => {
                dispatch(updateTask({ ...task, done: !task.done }));
              }}
            />
            <Stack spacing={0}>
              <Group position="left">
                <Text
                  component="p"
                  transform="capitalize"
                  size={"md"}
                  py={0}
                  my={0}
                  {...(done && {
                    color: "dimmed",
                    style: { textDecoration: "line-through" },
                  })}
                >
                  {title}
                </Text>
              </Group>
              <Group>
                {showGroup && (
                  <Indicator
                    styles={(_) => ({
                      indicator: {
                        color: section.accent || 'gray',
                        background: section.accent || 'gray',
                        width: '100%',
                        height: '100%',
                        borderRadius: '1px'
                      },
                      root: {
                        height: '0.35rem',
                        width: '2rem'
                      }
                    })}
                    position="middle-center"
                  ></Indicator>
                )}
                {dueDate && (
                  <Text color={"dimmed"} size={"xs"}>
                    {dueDate.toLocaleDateString()}
                  </Text>
                )}
              </Group>
            </Stack>
          </Group>
          <Group>
            {description?.length && <AlignRight />}

            <Menu
              withinPortal
              position="bottom-end"
              styles={(theme) => ({
                body: { background: theme.colors.dark[5] },
              })}
            >
              <Menu.Target>
                <ActionIcon>
                  <Dots />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  key={"open"}
                  icon={<ArrowsDiagonal />}
                  onClick={drawHandlers.open}
                >
                  Open
                </Menu.Item>
                <Menu.Item
                  key={"delete"}
                  color={"red"}
                  icon={<Trash size={14} />}
                  onClick={() => dispatch(deleteTask(id))}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Container>
    </>
  );
};

export default TaskItem;
