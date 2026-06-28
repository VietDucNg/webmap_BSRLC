import { useContext, useEffect, useRef } from "react";
import OLMap from "ol/Map";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";
import { createBasemapGroup } from "../../map/createBasemapGroup";
import {
  createLayerSwitcher,
  layerSwitcherStyles,
} from "../../map/createLayerSwitcher";
import { createView } from "../../map/createView";
import { CreateBsrlcGroup } from "../../map/createBsrlcGroup";
import { YearAContext } from "../../contexts/YearAContext";

export default function Map() {
  const { yearA } = useContext(YearAContext);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const bsrlcGroupRef = useRef(null);
  const bsrlcSourceRef = useRef(null);

  // create map once on mount
  useEffect(() => {
    if (!mapRef.current) return;

    const { group, source } = CreateBsrlcGroup(yearA);

    bsrlcGroupRef.current = group;
    bsrlcSourceRef.current = source;

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers: [createBasemapGroup(), bsrlcGroupRef.current],
      view: createView(),
    });

    mapInstance.current.addControl(createLayerSwitcher());

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current = null;
      }
    };
  }, []);

  // update bsrlc layer on year change
  useEffect(() => {
    if (!bsrlcSourceRef.current) return;

    bsrlcSourceRef.current.setUrl(
      `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearA}_web_tif/MapServer/tile/{z}/{y}/{x}`,
    );
  }, [yearA]);

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          ...layerSwitcherStyles(theme),
          ".ol-zoom button, .ol-zoom button:hover, .ol-zoom button:focus, .ol-zoom button:active":
            {
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
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
