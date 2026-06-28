import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { fromLonLat } from "ol/proj";
import { DEFAULT_CENTER_LON_LAT, DEFAULT_ZOOM } from "../../map/createView";

export default function HomeBtn({ view }) {
  function handleOnClick() {
    if (!view?.current) return;

    view.current.animate({
      center: fromLonLat(DEFAULT_CENTER_LON_LAT),
      zoom: DEFAULT_ZOOM,
      duration: 500,
    });
  }

  return (
    <IconButton
      variant="outlined"
      aria-label="Go to default view"
      onClick={handleOnClick}
      sx={(theme) => ({
        position: "absolute",
        top: "90px",
        left: "8px",
        width: "24px",
        height: "24px",
        borderRadius: "4px",
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        "&:hover": {
          border: `1px solid ${theme.palette.grey[700]}`,
          backgroundColor: theme.palette.background.paper,
        },
      })}
    >
      <HomeIcon sx={{ fontSize: "16px" }} />
    </IconButton>
  );
}
