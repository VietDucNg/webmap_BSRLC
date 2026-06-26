import { Button } from "@mui/material";
import CropPortraitOutlinedIcon from "@mui/icons-material/CropPortraitOutlined";
import CompareOutlinedIcon from "@mui/icons-material/CompareOutlined";
import { useContext } from "react";
import SplitViewContext from "../../contexts/SplitViewContext";

export default function SplitViewBtn() {
  const { isSplitMode, setIsSplitMode } = useContext(SplitViewContext);

  return (
    <Button
      variant="contained"
      size="small"
      startIcon={
        isSplitMode ? <CropPortraitOutlinedIcon /> : <CompareOutlinedIcon />
      }
      onClick={() => setIsSplitMode((prev) => !prev)}
      sx={{
        width: 150,
        backgroundColor: isSplitMode
          ? "background.paperCustomSolid"
          : "background.paper",
        color: "text.primary",
      }}
    >
      {isSplitMode ? "Single View" : "Split View"}
    </Button>
  );
}
