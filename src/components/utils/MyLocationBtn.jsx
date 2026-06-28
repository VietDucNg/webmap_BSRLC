import { IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function MyLocationBtn({ onClick }) {
  return (
    <IconButton
      variant="outlined"
      aria-label="Go to current location"
      onClick={onClick}
      sx={(theme) => ({
        position: "absolute",
        top: "60px",
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
      <MyLocationIcon sx={{ fontSize: "16px" }} />
    </IconButton>
  );
}
