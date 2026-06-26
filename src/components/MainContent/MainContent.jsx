import { useState, useEffect, useRef, useContext } from "react";
import { Box } from "@mui/material";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { TileArcGISRest } from "ol/source";
import { fromLonLat } from "ol/proj";
import MapController from "./MapController";
import SwipeDivider from "./SwipeDivider";
import SplitViewContext from "../../contexts/SplitViewContext";

export default function MainContent() {
  const mapElement = useRef(null);
  const mapRef = useRef(null);

  const layerARef = useRef(null);
  const layerBRef = useRef(null);

  const { isSplitMode } = useContext(SplitViewContext);
  const [swipePosition, setSwipePosition] = useState(50);
  const [yearA, setYearA] = useState(2000);
  const [yearB, setYearB] = useState(2022);

  // Sync mutable ref with current swipe state to protect event handlers from stale closures
  const swipePositionRef = useRef(swipePosition);
  useEffect(() => {
    swipePositionRef.current = swipePosition;
  }, [swipePosition]);

  useEffect(() => {
    // 1. Base Layer Configuration
    const baseLayer = new TileLayer({
      source: new XYZ({
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        attributions:
          "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
      }),
    });

    // 2. Map Layer A Initialization
    layerARef.current = new TileLayer({
      source: new TileArcGISRest({
        url: `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearA}_web_tif/MapServer`,
        params: {}, // Empty params object prevents request formatting failures
        projection: "EPSG:3857", // Forces correct alignment matching your 3857 network log
        crossOrigin: "anonymous",
      }),
    });

    // 3. Map Layer B Initialization
    layerBRef.current = new TileLayer({
      source: new TileArcGISRest({
        url: `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearB}_web_tif/MapServer`,
        params: {},
        projection: "EPSG:3857",
        crossOrigin: "anonymous",
      }),
      visible: false,
    });

    // 4. Map View Construction
    const map = new Map({
      target: mapElement.current,
      layers: [baseLayer, layerARef.current, layerBRef.current],
      view: new View({
        center: fromLonLat([17.923505641895904, 55.871116255137544]),
        zoom: 5,
      }),
    });

    mapRef.current = map;

    // 5. High-DPI Protected Canvas Clipping Context Hook
    layerBRef.current.on("prerender", (event) => {
      const ctx = event.context;
      const mapSize = map.getSize();
      if (!mapSize) return;

      const width = mapSize[0];
      const height = mapSize[1];
      const pixelRatio = event.frameState.pixelRatio;

      // Calculate split slider coordinates securely matching screen resolution multiplier
      const clipX = ((width * swipePositionRef.current) / 100) * pixelRatio;

      ctx.save();
      ctx.beginPath();
      ctx.rect(clipX, 0, width * pixelRatio - clipX, height * pixelRatio);
      ctx.clip();
    });

    layerBRef.current.on("postrender", (event) => {
      const ctx = event.context;
      ctx.restore();
    });

    return () => {
      map.setTarget(undefined);
    };
  }, []);

  // Hot Swap Tile Layers on Slider Modifications
  useEffect(() => {
    if (layerARef.current && mapRef.current) {
      layerARef.current.setSource(
        new TileArcGISRest({
          url: `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearA}_web_tif/MapServer`,
          params: {},
          projection: "EPSG:3857",
          crossOrigin: "anonymous",
        }),
      );
      mapRef.current.render();
    }
  }, [yearA]);

  useEffect(() => {
    if (layerBRef.current && mapRef.current) {
      layerBRef.current.setSource(
        new TileArcGISRest({
          url: `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearB}_web_tif/MapServer`,
          params: {},
          projection: "EPSG:3857",
          crossOrigin: "anonymous",
        }),
      );
      mapRef.current.render();
    }
  }, [yearB]);

  // Handle Split View visibility toggle mutations
  useEffect(() => {
    if (layerBRef.current && mapRef.current) {
      layerBRef.current.setVisible(isSplitMode);
      mapRef.current.render();
    }
  }, [isSplitMode, swipePosition]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: "100%",
        position: "relative",
        backgroundColor: "#0d1b2a",
        overflow: "hidden",
      }}
    >
      <Box ref={mapElement} sx={{ width: "100%", height: "100%" }} />

      <MapController
        title={
          isSplitMode ? "Map A: Baseline Land Cover" : "Land Cover Explorer"
        }
        year={yearA}
        onYearChange={setYearA}
        position="left"
      />

      {isSplitMode && (
        <>
          <MapController
            title="Map B: Comparison Land Cover"
            year={yearB}
            onYearChange={setYearB}
            position="right"
          />
          <SwipeDivider value={swipePosition} onChange={setSwipePosition} />
        </>
      )}
    </Box>
  );
}
