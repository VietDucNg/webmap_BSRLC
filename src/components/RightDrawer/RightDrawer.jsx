import { Link, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

export default function RightDrawer({ isRightDrawerOpen, toggleRightDrawer }) {
  const DrawerContent = (
    <Box
      sx={{ width: 360, p: 2 }}
      role="presentation"
      onClick={toggleRightDrawer(false)}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        Source
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        🔬 An annual land cover dataset for the Baltic Sea Region with crop
        types and peat bogs at 30m from 2000 to 2022
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>
        Vu-Dong Pham, Farina de Waard, Fabian Thiel, Bernd Bobertz, Christina
        Hellmann, Duc-Viet Nguyen, Felix Beer, M. Arasumani, Marcel Schwieder,
        Jörg Hartleib, David Frantz & Sebastian van der Linden
      </Typography>
      <br />
      <Typography>
        DOI:
        <br />
        <Link
          href="https://doi.org/10.1038/s41597-024-04062-w"
          target="_blank"
          rel="noopener"
        >
          https://doi.org/10.1038/s41597-024-04062-w
        </Link>
      </Typography>
      <br />
      <Typography>
        Data:
        <br />
        <Link
          href="https://zenodo.org/records/10653871"
          target="_blank"
          rel="noopener"
        >
          https://zenodo.org/records/10653871
        </Link>
      </Typography>

      <br />
      <Typography variant="h5" sx={{ mb: 1 }}>
        Credit
      </Typography>
      <Typography>
        👨‍🏫 The webmap developed by{" "}
        <Link
          href="https://vietducng.github.io/"
          target="_blank"
          rel="noopener"
        >
          Viet Nguyen
        </Link>
        .
      </Typography>

      <Typography>
        📦 The project hosted at{" "}
        <Link
          href="https://github.com/VietDucNg/webmap_BSRLC"
          target="_blank"
          rel="noopener"
        >
          Github repository.
        </Link>
      </Typography>
    </Box>
  );

  return (
    <Drawer
      anchor="right"
      open={isRightDrawerOpen}
      onClose={toggleRightDrawer(false)}
      sx={(theme) => ({
        "& .MuiDrawer-paper": {
          height: "min-content",
          borderRadius: "10px",
          marginRight: "10px",
          top: `calc(${theme.mixins.toolbar.minHeight}px + 40px)`,
          boxShadow: 3,
        },
      })}
    >
      {DrawerContent}
    </Drawer>
  );
}
