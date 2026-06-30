import { Box } from "@mui/material";
import Map from "./Map";
import YearSlider from "./YearSlider";
import { YearAContextProvider } from "../../contexts/YearAContextProvider";
import YearBContextProvider from "../../contexts/YearBContextProvider";
import { useContext } from "react";
import SplitViewContext from "../../contexts/SplitViewContext";
import SwipeDivider from "../utils/SwipeDivider";

export default function MainContent() {
  const { isSplitMode } = useContext(SplitViewContext);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Box sx={{ height: "100%", position: "relative" }}>
        <YearAContextProvider>
          <YearBContextProvider>
            <Map />
            <YearSlider forMap={"A"} />
            {isSplitMode && <YearSlider forMap={"B"} />}
            {isSplitMode && <SwipeDivider />}
          </YearBContextProvider>
        </YearAContextProvider>
      </Box>
    </Box>
  );
}
