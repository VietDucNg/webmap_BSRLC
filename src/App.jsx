import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header/Header";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="none" sx={{ my: 1, maxWidth: "1800px" }}>
        <Header mode={mode} setMode={setMode} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
