import { layerSwitcherStyles } from "../map/createLayerSwitcher";

export const mapGlobalStyles = (theme) => ({
  ...layerSwitcherStyles(theme),
  ".ol-zoom button, .ol-zoom button:hover, .ol-zoom button:focus, .ol-zoom button:active":
    {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  ".ol-scale-line": {
    // bottom: 30,
  },
  ".ol-attribution": {
    bottom: "3px",
  },
});
