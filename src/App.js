import React from "react";
import {
  Burger,
  Drawer,
  Group,
  Header,
  MantineProvider,
  Title,
} from "@mantine/core";
import { Tasks } from "./features/tasks/Tasks";
import { useDisclosure } from "@mantine/hooks";
import TaskSections from "./features/sections/Sections";

function App() {
  const [isNavOpen, navHandler] = useDisclosure(false);
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Header px={"sm"} py={"md"} height={'5rem'}>
        <Group position="apart">
          <Title>Productivator</Title>
          <Burger
          opened={isNavOpen}
            onClick={() => {
              navHandler.toggle();
            }}
          />
        </Group>
      </Header>
      {isNavOpen && (
        <Drawer
          title={<Title order={3}>Sections</Title>}
          padding={'xs'}
          opened={isNavOpen}
          position={'right'}
          onClose={() => {
            navHandler.close();
          }}
        >
          <nav>
            <TaskSections close={navHandler.close}/>
          </nav>
        </Drawer>
      )}
      <main>
        <Tasks />
      </main>
    </MantineProvider>
  );
}

export default App;
