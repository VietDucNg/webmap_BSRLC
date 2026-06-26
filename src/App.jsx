import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, Stack } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";
import LeftDrawer from "./components/LeftDrawer/LeftDrawer";
import MainContent from "./components/MainContent/MainContent";
import RightDrawer from "./components/RightDrawer/RightDrawer";
import SplitViewContext from "./contexts/SplitViewContext";

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
        }}
      >
        <SplitViewContext value={splitViewValue}>
          <Header
            mode={mode}
            setMode={setMode}
            toggleRightDrawer={toggleRightDrawer}
          />

          <Stack direction="row" sx={{ height: "100%" }}>
            <LeftDrawer
              open={isLeftDrawerOpen}
              toggleLeftDrawer={toggleLeftDrawer}
            />
            <MainContent />
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
