import { useContext, useEffect, useRef, useState } from "react";
import OLMap from "ol/Map";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";
import MyLocationBtn from "../utils/MyLocationBtn";
import { createBasemapGroup } from "../../map/createBasemapGroup";
import { createMyLocation } from "../../map/createMyLocation";
import {
  createLayerSwitcher,
  layerSwitcherStyles,
} from "../../map/createLayerSwitcher";
import { createView } from "../../map/createView";
import { CreateBsrlcGroup, getBsrlcLayerUrl } from "../../map/createBsrlcGroup";
import { YearAContext } from "../../contexts/YearAContext";
import { OpacityContext } from "../../contexts/OpacityContext";
import ScaleLine from "ol/control/ScaleLine";
import HomeBtn from "../utils/HomeBtn";
import { toLonLat } from "ol/proj";
import MouseCoordBox from "../utils/MouseCoordBox";

export default function Map() {
  const { yearA } = useContext(YearAContext);
  const { opacity } = useContext(OpacityContext);
  const [mouseCoord, setMouseCoord] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const bsrlcGroupRef = useRef(null);
  const bsrlcLayerRef = useRef(null);
  const bsrlcSourceRef = useRef(null);
  const geolocationRef = useRef(null);
  const viewRef = useRef(null);

  // create map once on mount
  useEffect(() => {
    if (!mapRef.current) return;

    const { group, layer, source } = CreateBsrlcGroup(yearA);

    bsrlcGroupRef.current = group;
    bsrlcLayerRef.current = layer;
    bsrlcSourceRef.current = source;

    const view = createView();
    viewRef.current = view;
    geolocationRef.current = createMyLocation(view);

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers: [createBasemapGroup(), bsrlcGroupRef.current],
      view,
    });

    mapInstance.current.addControl(createLayerSwitcher());
    mapInstance.current.addControl(new ScaleLine());

    // get mouse coordinate event
    mapInstance.current.on("pointermove", (event) => {
      const lonLat = toLonLat(event.coordinate);
      setMouseCoord(lonLat);
    });

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

    bsrlcSourceRef.current.setUrl(getBsrlcLayerUrl(yearA));
  }, [yearA]);

  // update bsrlc layer opacity on opacity change
  useEffect(() => {
    if (!bsrlcLayerRef.current) return;

    bsrlcLayerRef.current.setOpacity(opacity / 100);
  }, [opacity]);

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
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <Box
          ref={mapRef}
          sx={{
            height: "100%",
            width: "100%",
          }}
        />
        <MyLocationBtn
          onClick={() => geolocationRef.current?.setTracking(true)}
        />
        <HomeBtn view={viewRef} />
        <MouseCoordBox mouseCoord={mouseCoord} />
      </Box>
    </>
  );
}
