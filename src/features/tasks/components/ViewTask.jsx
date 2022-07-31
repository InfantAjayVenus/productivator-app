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
  ScrollArea,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { updateTask } from "../taskSlice";
import EditableType from "./EditableType.tsx";

const ViewTask = ({ id, title, done, description, drawToggle }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Stack justify={"space-between"} style={{ height: "90%" }}>
        <ScrollArea>
          <Container style={{ width: "100%" }}>
            <Group position="apart" my={"lg"} style={{ width: "100%" }}>
              <Group>
                <Checkbox
                  checked={done}
                  onChange={() => {
                    dispatch(
                      updateTask({ id, title, description, done: !done })
                    );
                  }}
                />
                <EditableType
                  TypeComponent={Title}
                  TypeComponentProps={{ order: 3 }}
                  text={title}
                  textSize={"lg"}
                  setText={(updatedTitle) => {
                    dispatch(
                      updateTask({ id, description, done, title: updatedTitle })
                    );
                  }}
                />
              </Group>
              <Badge color={`${done ? "green" : "gray"}`}>
                {done ? "DONE" : "TODO"}
              </Badge>
            </Group>
            <EditableType
              TypeComponent={Text}
              text={description}
              inputType="textarea"
              setText={(updatedDescription) => {
                dispatch(
                  updateTask({
                    id,
                    title,
                    done,
                    description: updatedDescription,
                  })
                );
              }}
            />
          </Container>
        </ScrollArea>

        <Group position="right">
          <Button
            variant={"outline"}
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
