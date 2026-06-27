import { useEffect, useRef } from "react";
import OLMap from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";
import { basemapGroup } from "../../map/basemapGroup";
import {
  createLayerSwitcher,
  layerSwitcherStyles,
} from "../../map/layerSwitcher";

export default function Map() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers: [basemapGroup],
      view: new View({
        center: fromLonLat([17.923505641895904, 55.871116255137544]),
        zoom: 5,
        projection: "EPSG:3857",
      }),
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
