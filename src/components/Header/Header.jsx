import { Box, IconButton, Stack } from "@mui/material";
import Logo from "./Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header({ mode, setMode }) {
  function changeMode() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <Stack
      direction={"row"}
      sx={{
        backgroundColor: "header.main",
        p: 2,
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Logo />
      <Box>
        <IconButton onClick={changeMode} sx={{ color: "header.contrastText" }}>
          {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Stack>
  );
}
