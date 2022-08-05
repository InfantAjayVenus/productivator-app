import React from "react";
import {
  Title,
  Group,
  Text,
  Container,
  Stack,
  Button,
  Badge,
  Checkbox,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../features/tasks/taskSlice";
import EditableType from "./EditableType.tsx";
import EditableDate from './EditableDate';

const ViewTask = ({ task, drawToggle }) => {
  const {title, description, done} = task;
  const dispatch = useDispatch();
  return (
    <>
      <Stack justify={"space-between"} style={{ height: "90%" }}>
        <Container style={{ width: "100%" }}>
          <Group position="apart" my={"lg"} style={{ width: "100%" }}>
            <Group>
              <Checkbox
                checked={done}
                onChange={() => {
                  dispatch(updateTask({ ...task, done: !done }));
                }}
              />
              <EditableType
                TypeComponent={Title}
                TypeComponentProps={{ order: 3 }}
                text={title}
                textSize={"lg"}
                setText={(updatedTitle) => {
                  dispatch(
                    updateTask({  ...task, title: updatedTitle })
                  );
                }}
              />
            </Group>
            <Badge color={`${done ? "green" : "gray"}`}>
              {done ? "DONE" : "TODO"}
            </Badge>
          </Group>
          <EditableDate 
            TypeComponent={Text}
            TypeComponentProps={{color: 'dimmed', pt: 0, size: 'sm'}}
            placeHolder={'Pick a due date'}
            date={new Date(task.dueDateStamp)}
            setDate={(date) => {
              dispatch(
                updateTask({...task, dueDateStamp: date.getTime()})
              )
            }}
          />
          <EditableType
            TypeComponent={Text}
            TypeComponentProps={{
              mt: 'md'
            }}
            text={description}
            inputType="textarea"
            placeholder={'Enter Task Description'}
            setText={(updatedDescription) => {
              dispatch(
                updateTask({ ...task, description: updatedDescription })
              );
            }}
          />
        </Container>
        <Group position="right">
          <Button
            variant={'outline'}
            color={"red"}
            leftIcon={<X />}
            onClick={() => {
              drawToggle();
            }}
          >
            Close
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default ViewTask;
