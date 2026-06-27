import { useEffect, useRef } from "react";
import OLMap from "ol/Map";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";
import { basemapGroup } from "../../map/basemapGroup";
import {
  createLayerSwitcher,
  layerSwitcherStyles,
} from "../../map/layerSwitcher";
import { initialView } from "../../map/initialView";
import { bsrlcGroup } from "../../map/bsrlcLayer";

export default function Map() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers: [basemapGroup, bsrlcGroup],
      view: initialView,
    });

    mapInstance.current.addControl(createLayerSwitcher());

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          ...layerSwitcherStyles(theme),
          ".ol-zoom button, .ol-zoom button:hover, .ol-zoom button:focus, .ol-zoom button:active":
            {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
              border: `1px solid ${theme.palette.text.primary}`,
            },
        })}
      />
      <Box
        ref={mapRef}
        sx={{
          height: "100%",
          width: "100%",
        }}
      />
    </>
  );
}
