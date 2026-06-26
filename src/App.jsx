import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Stack } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";
import MainContent from "./components/MainContent/MainContent";

function App() {
  // handle color mode
  const initialMode = function () {
    return localStorage.getItem("mode") || "light";
  };
  const [mode, setMode] = useState(initialMode);
  const theme = useMemo(() => getTheme(mode), [mode]);

  // localStorage
  useEffect(
    function () {
      localStorage.setItem("mode", mode);
    },
    [mode],
  );

  // left drawer
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(true);
  function toggleDrawer() {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="none"
        disableGutters
        sx={{
          maxWidth: "2000px",
          minHeight: "800px",
          height: "100vh",
        }}
      >
        <Header mode={mode} setMode={setMode} />

        <Stack direction="row" sx={{ height: "100%" }}>
          <LeftDrawer open={isLeftDrawerOpen} toggleDrawer={toggleDrawer} />
          <MainContent isLeftDrawerOpen={isLeftDrawerOpen} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
