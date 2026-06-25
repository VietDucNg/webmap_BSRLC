import { Box, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function Header({ mode, setMode, open, handleDrawerOpen }) {
  function changeMode() {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <Stack direction={"row"} sx={{ backgroundColor: "header.main", p: 2 }}>
      <Box sx={{ width: "50px" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              color: "header.contrastText",
              mx: 1,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Stack
        direction={"row"}
        sx={{
          flex: 1,
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "space-between",
        }}
      >
        <Logo />
        <Box>
          <IconButton
            onClick={changeMode}
            sx={{ color: "header.contrastText" }}
          >
            {mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
}
