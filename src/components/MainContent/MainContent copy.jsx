import { Box, Stack } from "@mui/material";

export default function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        transition: (theme) =>
          theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Stack></Stack>
    </Box>
  );
}
