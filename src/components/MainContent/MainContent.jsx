import { Box } from "@mui/material";
import Map from "./Map";
import YearSlider from "./YearSlider";
import { YearAContextProvider } from "../../contexts/YearAContextProvider";

export default function MainContent() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box sx={{ height: "100%", position: "relative" }}>
        <YearAContextProvider>
          <Map />
          <YearSlider />
        </YearAContextProvider>
      </Box>
    </Box>
  );
}
