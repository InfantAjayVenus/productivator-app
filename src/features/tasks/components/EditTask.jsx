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
import { DeviceFloppy, Trash } from "tabler-icons-react";

const EditTask = ({ taskId, handleSubmit }) => {
  /**
   * TODO:
   *  - Validate Title
   */
  const dispatch = useDispatch();
  const task = useSelector((state) => selectTaskById(state, taskId));
  const form = useForm({
    initialValues: {
      title: task.title,
      description: task.description,
      done: task.done,
    },
    validate: {
      title: (value) => value?.trim()?.length > 0,
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((data) => {
        dispatch(updateTask({ ...task, ...data }));
        handleSubmit();
      })}
    >
      <Stack justify={"space-between"} style={{ height: "100%" }}>
        <Container style={{ width: "100%", padding: 0 }}>
          <TextInput
            {...form.getInputProps("title")}
            my={"md"}
            placeholder={"Task Title"}
            required
          ></TextInput>
          <Textarea {...form.getInputProps("description")} minRows={6} my={"md"} placeholder={"Description of the Task"}></Textarea>
          <Switch {...form.getInputProps("done")} label={"Done"} />
        </Container>
        <Group position={"right"} mt="xl">
          <Button
            color={"red"}
            leftIcon={<Trash />}
            variant={form.values.done ? "outline" : "subtle"}
            onClick={() => {
              dispatch(deleteTask(taskId));
              handleSubmit();
            }}
          >
            Delete
          </Button>
          <Button mx={'md'} leftIcon={<DeviceFloppy />} type="submit">
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EditTask;
