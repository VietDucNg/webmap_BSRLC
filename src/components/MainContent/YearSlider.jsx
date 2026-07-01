import { Box, Button, Stack, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useContext } from "react";
import { YearAContext } from "../../contexts/YearAContext";
import { YearBContext } from "../../contexts/YearBContext";
import SplitViewContext from "../../contexts/SplitViewContext";

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

export default function YearSlider({ forMap }) {
  const { yearA, setYearA } = useContext(YearAContext);
  const { yearB, setYearB } = useContext(YearBContext);
  const { isSplitMode } = useContext(SplitViewContext);

  return (
    <Box
      sx={{
        paddingTop: 2,
        paddingBottom: 0.5,
        px: 3,
        position: "absolute",
        bottom: 35,
        backgroundColor: "background.paper",
        width: "400px",
        left:
          forMap === "B" || (forMap === "A" && !isSplitMode) ? "50%" : "auto",
        right: forMap === "A" && isSplitMode ? "50%" : "auto",
        transform: forMap == "B" ? "translateX(50%)" : "translateX(-50%)",
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
          {forMap == "A" ? yearA : yearB}
        </Button>
      </Stack>

      <Box sx={{ px: 1 }}>
        <Slider
          defaultValue={forMap == "A" ? 2000 : 2022}
          step={1}
          value={forMap == "A" ? yearA : yearB}
          onChange={(event, value) =>
            forMap == "A" ? setYearA(value) : setYearB(value)
          }
          valueLabelDisplay="auto"
          marks={marks}
          min={2000}
          max={2022}
        />
      </Box>
    </Box>
  );
}
