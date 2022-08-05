import React from "react";
import { MantineProvider } from "@mantine/core";
import Home from './pages/Home';

function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Home />
    </MantineProvider>
  );
}

export default App;
