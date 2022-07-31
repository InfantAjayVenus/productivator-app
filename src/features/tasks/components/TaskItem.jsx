import React, { useState } from "react";
import { ActionIcon, Checkbox, Container, createStyles, Drawer, Group, Menu, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../taskSlice";
import { AlignRight, ArrowsDiagonal, Dots, Trash } from "tabler-icons-react";
import ViewTask from "./ViewTask";
import { useDisclosure } from "@mantine/hooks";

const useContainerStyles = createStyles((theme) => ({
  container: {
    borderBottom: `1px solid ${theme.colors.dark[4]}`,

    '&:hover': {
      backgroundColor: theme.colors.dark[6]
    }
  }
}))

const TaskItem = ({ task, ...props }) => {
  const [drawState, drawHandlers] = useDisclosure(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const {classes} = useContainerStyles();

  const { id, title, description, done } = task;
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
        {drawState && <ViewTask
          {...{ ...task, isEdit, setEdit, drawToggle: drawHandlers.toggle }}
        />}
      </Drawer>
      <Container
        py={0}
        px={"sm"}
        {...props}
        tabIndex={0}
        className={classes.container}
      >
        <Group position="apart" noWrap>
          <Group >
            <Checkbox
              checked={done}
              onChange={() => {
                dispatch(updateTask({ ...task, done: !task.done }));
              }}
            />
            <Text
              component="p"
              transform="capitalize"
              size="lg"
              {...(done && {
                color: "dimmed",
                style: { textDecoration: "line-through" },
              })}
            >
              {title}
            </Text>
          </Group>
          <Group>
            {description?.length && <AlignRight />}

            <Menu
              styles={(theme) => ({
                body: { background: theme.colors.dark[5] },
              })}
            >
              <Menu.Target>
                <ActionIcon><Dots /></ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<ArrowsDiagonal />}
                  onClick={drawHandlers.open}
                >
                  Expand
                </Menu.Item>
                <Menu.Item
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
