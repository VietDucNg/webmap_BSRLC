import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import getTheme from "./theme";
import { useEffect, useMemo, useState } from "react";

function App() {
  // handle color mode
  const initialMode = function () {
    return localStorage.getItem("mode") || "dark";
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
      <Container maxWidth="none" sx={{ my: 2, maxWidth: "1800px" }}></Container>
    </ThemeProvider>
  );
}

export default App;
