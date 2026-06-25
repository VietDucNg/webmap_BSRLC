import { Box, Stack, Typography } from "@mui/material";

export default function Logo() {
  return (
    <Stack direction={"row"} sx={{ gap: 1, color: "header.contrastText" }}>
      <Typography sx={{ fontSize: "30px", mx: 1 }}>🍀</Typography>
      <Box>
        <Typography variant="h5" component={"h1"}>
          Baltic Sea Region Land Cover
        </Typography>
        <Typography>Annual dataset 2000 - 2022</Typography>
      </Box>
    </Stack>
  );
}
