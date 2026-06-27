import { Box, Typography, List, ListItem, Stack } from "@mui/material";

import Collapse from "@mui/material/Collapse";

const landCoverClasses = [
  { name: "Built up", color: "#ff0000" },
  { name: "Bareland", color: "#969696" },
  { name: "Water", color: "#00ccf2" },
  { name: "Shrub land", color: "#a6ff00" },
  { name: "Broadleaf forest", color: "#009600" },
  { name: "Coniferous forest", color: "#006400" },
  { name: "Wetland marsh", color: "#a6a6ff" },
  { name: "Exploited peatbog", color: "#7a4700" },
  { name: "Unexploited peatbog", color: "#4d4dff" },
  { name: "Wheat", color: "#fbfb16" },
  { name: "Barley", color: "#e4ce3f" },
  { name: "Rye", color: "#ea7f12" },
  { name: "Oat", color: "#b45b61" },
  { name: "Maize", color: "#b45b61" },
  { name: "Seed crops", color: "#ee439c" },
  { name: "Root crops", color: "#9a0cee" },
  { name: "Pulses, vegetables", color: "#9eac2e" },
  { name: "Grassland", color: "#c1ecd0" },
];

export default function Legend({ isLeftDrawerOpen }) {
  return (
    <Box sx={{ p: 2 }}>
      <Collapse orientation="horizontal" in={isLeftDrawerOpen}>
        <Typography variant="h6" gutterBottom>
          Land Cover Classes
        </Typography>
      </Collapse>

      <List dense>
        {landCoverClasses.map((item) => (
          <ListItem key={item.name} disableGutters>
            <Stack direction="row" spacing={1}>
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  backgroundColor: item.color,
                  border: "1px solid #ccc",
                }}
              />
              <Collapse orientation="horizontal" in={isLeftDrawerOpen}>
                <Typography variant="body2">{item.name}</Typography>
              </Collapse>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
