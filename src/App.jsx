import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Stack } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";

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
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsLeftDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsLeftDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="none" sx={{ my: 1, maxWidth: "1800px" }}>
        <Header
          mode={mode}
          setMode={setMode}
          open={isLeftDrawerOpen}
          handleDrawerOpen={handleDrawerOpen}
        />
        <Stack>
          <LeftDrawer
            open={isLeftDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
