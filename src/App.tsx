import React from "react";
import { ActionIcon, MantineProvider, Tooltip } from "@mantine/core";
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom'
import Sections from './pages/Sections';
import { Home, ListCheck } from "tabler-icons-react";

import NavContainer from './pages/layout-components/NavContainer';
import Tasks from "./pages/Tasks";
// import NewItem from "./pages/NewItem";

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Router>
        <NavContainer>
          <Tooltip label={'All Tasks'}>
            <NavLink to='/tasks'>
              <ActionIcon><ListCheck /></ActionIcon>
            </NavLink>
          </Tooltip>
          <Tooltip label={'Home'}>
            <NavLink to='/'>
              <ActionIcon><Home /></ActionIcon>
            </NavLink>
          </Tooltip>
        </NavContainer>
        <main>
          <Routes>
            <Route path="/" element={<Sections />} >
            </Route>
            <Route path="/tasks/:sectionId" element={<Tasks />} >
            </Route>
            <Route path="/tasks" element={<Tasks />} >
            </Route>
          </Routes>
        </main>
      </Router>
    </MantineProvider>
  );
}

export default App;
