import { IconButton, Stack } from "@mui/material";
import Logo from "./Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AboutBtn from "./AboutBtn";
import SplitViewBtn from "./SplitViewBtn";

export default function Header({ mode, setMode, toggleRightDrawer }) {
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
      <Stack direction={"row"} spacing={2}>
        <SplitViewBtn />
        <IconButton onClick={changeMode} sx={{ color: "header.contrastText" }}>
          {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        <AboutBtn toggleRightDrawer={toggleRightDrawer} />
      </Stack>
    </Stack>
  );
}
