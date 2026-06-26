import { Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AboutBtn({ toggleRightDrawer }) {
  return (
    <Button
      variant="text"
      startIcon={<InfoOutlinedIcon />}
      sx={{ color: "header.contrastText" }}
      onClick={toggleRightDrawer(true)}
    >
      About
    </Button>
  );
}
