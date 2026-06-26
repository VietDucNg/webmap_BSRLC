import { Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AboutBtn() {
  return (
    <Button
      variant="text"
      startIcon={<InfoOutlinedIcon />}
      sx={{ color: "header.contrastText" }}
    >
      About
    </Button>
  );
}
