import React from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Container,
  Group,
  Stack,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { selectTaskById, updateTask, deleteTask } from "../taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { DeviceFloppy, Trash, X } from "tabler-icons-react";

const EditTask = ({ taskId, goBack, style }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => selectTaskById(state, taskId));
  const form = useForm({
    initialValues: {
      title: task.title,
      description: task.description,
      done: task.done,
    },
    validate: {
      title: (value) => value?.trim()?.length > 0 ? null : "Title is a required field",
    },
  });
  return (
    <form
      style={style}
      onSubmit={form.onSubmit((data) => {
        dispatch(updateTask({ ...task, ...data }));
        goBack();
      })}
    >
      <Stack justify={"space-between"} style={{ height: "100%" }}>
        <Container style={{ width: "100%", padding: 0 }}>
          <TextInput
            {...form.getInputProps("title")}
            my={"md"}
            placeholder={"Task Title"}
          ></TextInput>
          <Textarea
            {...form.getInputProps("description")}
            minRows={6}
            my={"md"}
            placeholder={"Description of the Task"}
          ></Textarea>
          <Switch {...form.getInputProps("done")} label={"Done"} />
        </Container>
        <Group position={"right"} mt="xl">
          <Button
            style={{
              transition: 'all 0.3s ease-in-out'
            }}
            color={"red"}
            leftIcon={<Trash />}
            variant={form.values.done ? "outline" : "subtle"}
            onClick={() => {
              dispatch(deleteTask(taskId));
              goBack();
            }}
          >
            Delete
          </Button>
          <Button leftIcon={<X />} color={"orange"} variant={"outline"} onClick={goBack}>
            Cancel
          </Button>
          <Button leftIcon={<DeviceFloppy />} type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EditTask;
