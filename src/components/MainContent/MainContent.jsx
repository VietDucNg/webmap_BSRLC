import { Box } from "@mui/material";
import Map from "./Map";
import YearSlider from "./YearSlider";
import { useState } from "react";
import { YearAContext } from "../../contexts/YearAContext";

export default function MainContent() {
  const [yearA, setYearA] = useState(2000);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box sx={{ height: "100%", position: "relative" }}>
        <YearAContext value={{ yearA, setYearA }}>
          <Map />
          <YearSlider />
        </YearAContext>
      </Box>
    </Box>
  );
}
