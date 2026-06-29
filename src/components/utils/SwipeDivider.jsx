import { Box } from "@mui/material";
import { useContext } from "react";
import SplitViewContext from "../../contexts/SplitViewContext";

export default function SwipeDivider() {
  const { dividerPosition } = useContext(SplitViewContext);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        bottom: 0,

        right: `${dividerPosition * 100}%`,
        transform: "translateX(-50%)",

        width: "4px",

        bgcolor: "white",

        borderLeft: "1px solid grey",
        borderRight: "1px solid grey",

        zIndex: 1000,

        pointerEvents: "none",
      }}
    />
  );
}
