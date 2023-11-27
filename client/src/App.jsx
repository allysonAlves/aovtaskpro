import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { Card, ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <TaskProvider>
          <AppContainer>
            <Header />
            <Outlet />
          </AppContainer>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
