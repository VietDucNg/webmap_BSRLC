import { Box } from "@mui/material";

export default function MouseCoordBox({ mouseCoord }) {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 4,
        right: 40,
        px: 1,
        py: 0.5,
        bgcolor: "background.paper",
        borderRadius: 1,
        fontSize: "body2.fontSize",
      }}
    >
      {mouseCoord
        ? `Lat: ${mouseCoord[1].toFixed(5)}, Long: ${mouseCoord[0].toFixed(5)}`
        : ""}
    </Box>
  );
}
