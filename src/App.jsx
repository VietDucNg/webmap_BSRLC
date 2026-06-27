import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Stack } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";
import RightDrawer from "./components/RightDrawer/RightDrawer";
import SplitViewContext from "./contexts/SplitViewContext";
import Main from "./components/MainContent/Main";

const initialMode = () => localStorage.getItem("mode") || "light";

export default function App() {
  // handle color mode
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
  function toggleLeftDrawer() {
    setIsLeftDrawerOpen(!isLeftDrawerOpen);
  }

  // right drawer
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const toggleRightDrawer = (newOpen) => () => {
    setIsRightDrawerOpen(newOpen);
  };

  // split mode state
  const [isSplitMode, setIsSplitMode] = useState(false);
  const splitViewValue = useMemo(
    () => ({ isSplitMode, setIsSplitMode }),
    [isSplitMode],
  );

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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SplitViewContext value={splitViewValue}>
          <Header
            mode={mode}
            setMode={setMode}
            toggleRightDrawer={toggleRightDrawer}
          />

          <Stack direction="row" sx={{ flex: 1 }}>
            <LeftDrawer
              open={isLeftDrawerOpen}
              toggleLeftDrawer={toggleLeftDrawer}
            />
            <Main />
            <RightDrawer
              isRightDrawerOpen={isRightDrawerOpen}
              toggleRightDrawer={toggleRightDrawer}
            />
          </Stack>
        </SplitViewContext>
      </Container>
    </ThemeProvider>
  );
}
