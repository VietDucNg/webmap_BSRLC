import { Box, Stack } from "@mui/material";
import Map from "./Map";

export default function Main() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Stack sx={{ height: "100%" }}>
        <Map />
      </Stack>
    </Box>
  );
}
