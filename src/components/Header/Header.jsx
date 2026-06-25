import { Box, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Logo from "./Logo";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { drawerWidth } from "../LeftDrawer/LeftDrawer";

function changeMode() {
  setMode((prev) => (prev === "dark" ? "light" : "dark"));
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export default function Header({ mode, setMode, open, handleDrawerOpen }) {
  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ backgroundColor: "header.main" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={[
            {
              marginRight: 5,
            },
            open && { display: "none" },
          ]}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          direction={"row"}
          sx={{
            width: "100%",
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
      </Toolbar>
    </AppBar>
  );
}
