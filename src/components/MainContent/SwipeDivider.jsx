import { Box } from "@mui/material";

export default function SwipeDivider({ value, onChange }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999,
        pointerEvents: "none", // click through transparent areas
      }}
    >
      {/* Visual Divider Line */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: `${value}%`,
          width: "4px",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          transform: "translateX(-2px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Thumb Grabber Anchor Circle */}
        <Box
          sx={{
            width: 32,
            height: 32,
            backgroundColor: "#fff",
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "ew-resize",
            pointerEvents: "auto",
            "&::before, &::after": {
              content: '""',
              width: 2,
              height: 12,
              backgroundColor: "#ccc",
              mx: 0.25,
            },
          }}
        />
      </Box>

      {/* Hidden Native Range Slider matching viewport dimensions to capture drags safely */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          opacity: 0,
          cursor: "ew-resize",
          pointerEvents: "auto",
        }}
      />
    </Box>
  );
}
