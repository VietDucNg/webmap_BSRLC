import LayerSwitcher from "ol-layerswitcher";

export function createLayerSwitcher() {
  return new LayerSwitcher({
    // activationMode: "click",
    startActive: false,
    tipLabel: "Layer Controls",
    groupSelectStyle: "group",
  });
}

export const layerSwitcherStyles = (theme) => ({
  ".layer-switcher": {
    top: "8px",
    right: "8px",
    backgroundColor: "transparent",
    overflow: "visible !important",
  },
  ".layer-switcher .panel": {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid lightgray",
    borderRadius: "12px",
    padding: "16px",
  },
  ".layer-switcher button": {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "1px solid lightgray",
    backgroundSize: "32px 32px",
    backgroundPosition: "center",
    backgroundColor: theme.palette.background.paper,
  },
  ".layer-switcher button:hover": {
    border: "1px solid black",
  },
  ".layer-switcher .panel ul": {
    margin: 0,
    padding: 0,
  },
  ".layer-switcher li": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  ".layer-switcher li label": {
    padding: 0,
  },
  ".layer-switcher li label:hover:not(.disabled)": {
    cursor: "pointer",
  },
  ".layer-switcher li input": {
    position: "static",
  },
  ".layer-switcher .group": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  ".ol-zoom button, .ol-zoom button:hover, .ol-zoom button:focus, .ol-zoom button:active":
    {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.text.primary}`,
    },
});
