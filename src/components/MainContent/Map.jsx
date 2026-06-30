import { useContext, useEffect, useRef, useState } from "react";
import OLMap from "ol/Map";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";
import MyLocationBtn from "../utils/MyLocationBtn";
import { createBasemapGroup } from "../../map/createBasemapGroup";
import { createMyLocation } from "../../map/createMyLocation";
import { createLayerSwitcher } from "../../map/createLayerSwitcher";
import { mapGlobalStyles } from "../../utils/globalMapStyles";
import { createView } from "../../map/createView";
import { CreateBsrlcLayer, getBsrlcLayerUrl } from "../../map/createBsrlcLayer";
import { YearAContext } from "../../contexts/YearAContext";
import { OpacityContext } from "../../contexts/OpacityContext";
import ScaleLine from "ol/control/ScaleLine";
import HomeBtn from "../utils/HomeBtn";
import { toLonLat } from "ol/proj";
import MouseCoordBox from "../utils/MouseCoordBox";
import { YearBContext } from "../../contexts/YearBContext";
import SplitViewContext from "../../contexts/SplitViewContext";
import LayerGroup from "ol/layer/Group";

export default function Map() {
  const { yearA } = useContext(YearAContext);
  const { yearB } = useContext(YearBContext);
  const { isSplitMode } = useContext(SplitViewContext);
  const { opacity } = useContext(OpacityContext);
  const [mouseCoord, setMouseCoord] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const bsrlcGroupRef = useRef(null);
  const bsrlcLayerARef = useRef(null);
  const bsrlcSourceARef = useRef(null);
  const bsrlcLayerBRef = useRef(null);
  const bsrlcSourceBRef = useRef(null);
  const geolocationRef = useRef(null);
  const viewRef = useRef(null);

  // create map once on mount
  useEffect(() => {
    if (!mapRef.current) return;

    const { layer, source } = CreateBsrlcLayer(isSplitMode, "A", yearA);
    const bsrlcGroup = new LayerGroup({
      title: "Layers",
      layers: [],
    });

    bsrlcLayerARef.current = layer;
    bsrlcSourceARef.current = source;
    bsrlcGroupRef.current = bsrlcGroup;

    bsrlcGroup.getLayers().push(layer);

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

  // create/remove Layer B
  useEffect(() => {
    if (!mapInstance.current) return;

    if (isSplitMode) {
      if (bsrlcLayerBRef.current) return;

      const { layer, source } = CreateBsrlcLayer(isSplitMode, "B", yearB);

      bsrlcLayerBRef.current = layer;
      bsrlcSourceBRef.current = source;

      layer.setOpacity(opacity / 100);

      bsrlcGroupRef.current.getLayers().push(layer);

      return;
    }

    // remove layer when split disabled
    if (bsrlcLayerBRef.current) {
      bsrlcGroupRef.current.getLayers().remove(bsrlcLayerBRef.current);

      bsrlcLayerBRef.current = null;
      bsrlcSourceBRef.current = null;
    }
  }, [isSplitMode]);

  // update bsrlc layer on year change
  useEffect(() => {
    if (!bsrlcSourceARef.current) return;

    bsrlcSourceARef.current.setUrl(getBsrlcLayerUrl(yearA));
  }, [yearA]);

  useEffect(() => {
    if (!bsrlcSourceBRef.current) return;

    bsrlcSourceBRef.current.setUrl(getBsrlcLayerUrl(yearB));
  }, [yearB]);

  // update bsrlc layer opacity on opacity change
  useEffect(() => {
    if (!bsrlcLayerARef.current) return;

    bsrlcLayerARef.current.setOpacity(opacity / 100);
    bsrlcLayerBRef.current?.setOpacity(opacity / 100);
  }, [opacity]);

  return (
    <>
      <GlobalStyles styles={mapGlobalStyles} />
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
