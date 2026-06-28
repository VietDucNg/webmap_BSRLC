import { useContext } from "react";
import { Box, Collapse, Slider, Typography } from "@mui/material";
import { OpacityContext } from "../../contexts/OpacityContext";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

export default function OpacityControl({ isLeftDrawerOpen }) {
  const { opacity, setOpacity } = useContext(OpacityContext);

  return (
    <Box sx={{ p: 2 }}>
      <Collapse orientation="horizontal" in={isLeftDrawerOpen}>
        <Typography variant="h6" gutterBottom>
          Opacity Control
        </Typography>
      </Collapse>

      <Box sx={{ px: 1 }}>
        <Slider
          value={opacity}
          onChange={(event, value) => setOpacity(value)}
          step={1}
          valueLabelDisplay="auto"
          marks={isLeftDrawerOpen ? marks : []}
          min={0}
          max={100}
        />
      </Box>
    </Box>
  );
}
