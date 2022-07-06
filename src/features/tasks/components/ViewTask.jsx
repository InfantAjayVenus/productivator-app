import React from "react";
import {
  Title,
  Group,
  Text,
  Container,
  Stack,
  Button,
  Badge,
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../taskSlice";

const ViewTask = ({ id, title, done, description, setEdit, setDrawOpen }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Stack justify={"space-between"} style={{ height: "90%" }}>
        <Container style={{width: '100%'}}>
          <Group position="apart" my={"lg"} style={{ width: "100%" }}>
            <Title order={3}>{title}</Title>
            <Badge color={`${done ? "green" : "gray"}`}>
              {done ? "DONE" : "TODO"}
            </Badge>
          </Group>
          <Text>{description}</Text>
        </Container>
        <Group position="right">
          <Button
            variant={done ? "outline" : "subtle"}
            color={'red'}
            leftIcon={<Trash />}
            onClick={() => {
              dispatch(deleteTask(id));
              setDrawOpen(false);
            }}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            leftIcon={<Pencil />}
            onClick={() => {
              setEdit(true);
            }}
          >
            Edit
          </Button>
        </Group>
      </Stack>
    </>
  );
};

export default ViewTask;
