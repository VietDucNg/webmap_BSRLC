import { createTheme } from "@mui/material/styles";

export default function getTheme(mode) {
  return createTheme({
    palette: {
      mode: mode,
      background: {
        paper: "rgba(61, 122, 245, 0.1)",
        paperSolid: mode === "light" ? "rgb(217, 228, 253)" : "rgb(26, 37, 62)",
      },
    },
    typography: {
      fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontSize: "clamp(2.2rem, 1.5vw + 1.5rem, 3.2rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: "clamp(1.8rem, 1.2vw + 1.2rem, 2.6rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "clamp(1.5rem, 1vw + 1rem, 2.2rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h4: {
        fontSize: "clamp(1.3rem, 0.8vw + 0.9rem, 1.8rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h5: {
        fontSize: "clamp(1.1rem, 0.5vw + 0.8rem, 1.4rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h6: {
        fontSize: "clamp(1rem, 0.3vw + 0.75rem, 1.2rem)",
        fontWeight: 700,
        lineHeight: 1.2,
      },
      body1: {
        fontSize: "1rem",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            textTransform: "none",
          },
        },
      },
    },
  });
}
