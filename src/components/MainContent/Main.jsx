import { Box } from "@mui/material";
import Map from "./Map";
import YearSlider from "./YearSlider";
import { useState } from "react";

export default function Main() {
  const [yearA, setYearA] = useState(2000);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box sx={{ height: "100%", position: "relative" }}>
        <Map />
        <YearSlider yearA={yearA} setYearA={setYearA} />
      </Box>
    </Box>
  );
}
