import React, { useState } from "react";
import { Card, Checkbox, Drawer, Group, Menu, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../taskSlice";
import { AlignRight, ArrowsDiagonal, Trash } from "tabler-icons-react";
import ViewTask from "./ViewTask";
import { useDisclosure } from "@mantine/hooks";

const ListItem = ({ task, ...props }) => {
  const [drawState, drawHandlers] = useDisclosure(false);
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();

  
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
        <ViewTask {...{ ...task, isEdit, setEdit, drawToggle: drawHandlers.toggle }} />
      </Drawer>
      <Card
        key={id}
        component="li"
        my={16}
        py={0}
        px={"sm"}
        {...props}
        tabIndex={0}
      >
        <Group position="apart">
          <Group>
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
              mx={"auto"}
              {...(done && {
                color: "dimmed",
                style: { textDecoration: "line-through" },
              })}
              inline
            >
              {title}
            </Text>
          </Group>
          <Group>
            {description?.length && <AlignRight />}

            <Menu
              shadow={"xl"}
              styles={(theme) => ({
                body: { background: theme.colors.dark[5] },
              })}
            >
              <Menu.Item icon={<ArrowsDiagonal />} onClick={drawHandlers.open}>Expand</Menu.Item>
              <Menu.Item
                color={"red"}
                icon={<Trash size={14} />}
                onClick={() => dispatch(deleteTask(id))}
              >
                Delete
              </Menu.Item>
            </Menu>
          </Group>
        </Group>
      </Card>
    </>
  );
};

export default ListItem;
