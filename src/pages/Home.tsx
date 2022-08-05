import React from "react";
import {
  Burger,
  Drawer,
  Group,
  Header,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TaskSections from "./layout-components/Sections";
import Tasks from "./layout-components/Tasks";

function Home() {
  const [isDrawOpen, drawHandle] = useDisclosure(false);

  return (
    <>
      <Header height={'3rem'} px={"md"} py={"xs"}>
        <Group position="apart">
          <Title order={3}>Productivator</Title>
          <Burger opened={isDrawOpen} size={'sm'} onClick={drawHandle.toggle} />
        </Group>
      </Header>
      <nav>
        <Drawer opened={isDrawOpen} onClose={drawHandle.toggle} position={'right'} title={<Title order={4} px={'xs'}>Sections</Title>}>
          <TaskSections close={() => drawHandle.close()}/>
        </Drawer>
      </nav>
      <main>
        <Tasks />
      </main>
    </>
  );
}

export default Home;
