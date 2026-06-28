import { Box, Button, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useContext } from "react";
import { YearAContext } from "../../contexts/YearAContext";

const marks = [
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 2010,
    label: "2010",
  },
  {
    value: 2022,
    label: "2022",
  },
];

export default function YearSlider() {
  const { yearA, setYearA } = useContext(YearAContext);

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        position: "absolute",
        bottom: 10,
        backgroundColor: "background.paper",
        width: "400px",
        left: "50%",
        transform: "translateX(-50%)",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack direction={"row"} sx={{ justifyContent: "space-between", pb: 1 }}>
        <Stack direction={"row"} spacing={1} sx={{ mb: 2 }}>
          <CalendarTodayIcon />
          <Typography> TEMPORAL SELECTION</Typography>
        </Stack>
        <Button variant="contained" sx={{ pointerEvents: "none" }}>
          {yearA}
        </Button>
      </Stack>

      <Box sx={{ px: 1 }}>
        <Slider
          defaultValue={2000}
          step={1}
          value={yearA}
          onChange={(event, value) => setYearA(value)}
          valueLabelDisplay="auto"
          marks={marks}
          min={2000}
          max={2022}
        />
      </Box>
    </Box>
  );
}
