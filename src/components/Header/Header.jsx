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
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "space-between",
        backgroundColor: "header.main",
        padding: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
