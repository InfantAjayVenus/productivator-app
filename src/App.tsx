import React from "react";
import { ActionIcon, Drawer, MantineProvider, Tooltip } from "@mantine/core";
import { BrowserRouter as Router, NavLink, Routes, Route, Link } from 'react-router-dom'
import Sections from './pages/Sections';
import HomePage from './pages/HomePage';
import { Bolt, Home, List } from "tabler-icons-react";

import NavContainer from './pages/layout-components/NavContainer';
import Tasks from "./pages/Tasks";
import { useDisclosure } from "@mantine/hooks";
// import NewItem from "./pages/NewItem";

function App() {
  const [isQuickAddOpen, quickAddHandler] = useDisclosure(false);
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router basename="/productivator-app">
        <NavContainer>
          <Tooltip label={'Quick List'}>
            <NavLink to='/lists'>
              <ActionIcon><List /></ActionIcon>
            </NavLink>
          </Tooltip>
          <Tooltip label={'Home'}>
            <NavLink to='/home' >
              <ActionIcon><Home /></ActionIcon>
            </NavLink>
          </Tooltip>
          <Tooltip label={'Quick Add'}>
            <Link to='#' onClick={quickAddHandler.open}>
              <ActionIcon color={'yellow'} ><Bolt /></ActionIcon>
            </Link>
          </Tooltip>
        </NavContainer>
        <main>
          <Routes>
            <Route path="/lists" element={<Sections />} >
            </Route>
            <Route path="/lists/:sectionId" element={<Tasks />}>
            </Route>
            <Route path="/Home" element={<HomePage />} >
            </Route>
          </Routes>
          <Drawer
            title={'⚡Quick Add'}
            padding={'md'}
            opened={isQuickAddOpen}
            onClose={quickAddHandler.close}
            position={'bottom'}
          >
            
          </Drawer>
        </main>
      </Router>
    </MantineProvider>
  );
}

export default App;
