import React, { useState,useEffect } from "react";
import {
  Container,
  Title,
  ActionIcon,
  TextInput,
  ScrollArea,
  Header,
} from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";

import { addTask, selectTasksList,deleteTask } from "./taskSlice";

import ListItem from './components/ListItem';
import { Flipped, Flipper } from "react-flip-toolkit";

export function Tasks() {
  const [task, setTask] = useState("");
  const taskList = useSelector(selectTasksList);
  const dispatch = useDispatch();

  const clearTasks = ()=>{
    taskList.map((task)=>{
      if(task.doneTimeStamp!=0){
        if (Math.abs(task.doneTimeStamp - Date.now()) / 1000 / 60 / 60 / 24 > 2){
          dispatch(deleteTask(task.id));
        }
      }
    })
  }
  useEffect(()=>{
    const interval=setInterval(()=>clearTasks(),5000);
    return () =>{
      clearInterval(interval);
    }
  },[taskList])
  return (
    <>
      <Container p={'md'}>
        <Header height={'3rem'} m={8}>
          <Title>Productivator</Title>
        </Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!task.trim().length)
              return;
            dispatch(addTask(task));
            setTask("");
          }}
        >
          <TextInput
            id="add-task"
            placeholder="Enter task here"
            value={task}
            style={{ width: "100%", padding: "0.25rem 0.5rem" }}
            onChange={(e) => {
              setTask(e.target.value);
              e.target.focus();
            }}
            rightSection={<ActionIcon color={"blue"} variant={"light"} type={"submit"}>
              <Plus />
            </ActionIcon>}
            autoFocus
            required />
        </form>
        <ScrollArea style={{ height: "85vh" }} px={'xs'}>
          <Flipper flipKey={taskList.map(({ timeStamp }) => timeStamp).join('')}>
            <ul style={{ padding: 0 }}>
              {taskList
                .map(taskItem => (
                  <Flipped key={taskItem.id} flipId={taskItem.id}>
                    <ListItem task={taskItem} />
                  </Flipped>
                ))}
            </ul>
          </Flipper>
        </ScrollArea>
      </Container>
    </>
  );
}
