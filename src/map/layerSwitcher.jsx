import LayerSwitcher from "ol-layerswitcher";
import { none } from "ol/centerconstraint";

export function createLayerSwitcher() {
  return new LayerSwitcher({
    activationMode: "click",
    startActive: false,
    tipLabel: "Layer Controls",
    groupSelectStyle: "none",
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
  ".layer-switcher button, .layer-switcher button:hover, .layer-switcher button:focus, .layer-switcher.shown.layer-switcher-activation-mode-click > button, .layer-switcher.shown.layer-switcher-activation-mode-click > button:hover, .layer-switcher.shown.layer-switcher-activation-mode-click > button:focus":
    {
      width: "42px",
      height: "42px",
      borderRadius: "12px",
      backgroundSize: "32px 32px",
      backgroundPosition: "center",
      backgroundColor: theme.palette.background.paper,
      cursor: "pointer",
    },
  ".layer-switcher button:hover": {
    border: "1px solid black",
  },
  ".layer-switcher .panel > ul:first-of-type": {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  ".layer-switcher .panel .group": {
    display: "flex",
    alignItems: "start",
    gap: "5px",
  },

  ".layer-switcher .panel .layer": {
    display: "flex",
    alignItems: "center",
    gap: "5px",
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
  ".layer-switcher.shown.layer-switcher-activation-mode-click > button": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    left: "-15px",
  },
});
