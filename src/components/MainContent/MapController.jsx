import { Paper, Typography, Slider, Box, Stack } from "@mui/material";

export default function MapController({
  title,
  year,
  onYearChange,
  position = "left",
}) {
  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: 20,
        [position]: 20, // dynamically float left or right
        zIndex: 1000,
        width: 260,
        padding: 2.5,
        backgroundColor: "rgba(30, 30, 30, 0.85)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bold", mb: 1, letterSpacing: 0.5 }}
      >
        {title}
      </Typography>
      <Stack direction="row" sx={{ mb: 1 }}>
        <Typography variant="caption" color="grey.400">
          Selected Year:
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: "#64b5f6" }}
        >
          {year}
        </Typography>
      </Stack>

      <Slider
        value={year}
        min={2000}
        max={2022}
        step={1}
        onChange={(e, val) => onYearChange(val)}
        valueLabelDisplay="auto"
        sx={{
          color: "#64b5f6",
          height: 4,
          "& .MuiSlider-thumb": { width: 14, height: 14 },
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: -0.5 }}>
        <Typography variant="caption" color="grey.500">
          2000
        </Typography>
        <Typography variant="caption" color="grey.500">
          2022
        </Typography>
      </Box>
    </Paper>
  );
}
