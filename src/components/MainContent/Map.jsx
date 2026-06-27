import { useEffect, useRef } from "react";
import OLMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import LayerGroup from "ol/layer/Group";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import LayerSwitcher from "ol-layerswitcher";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box, GlobalStyles } from "@mui/material";

const BASEMAPS = [
  {
    title: "World Topo",
    type: "base",
    visible: true,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles © Esri — Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
  },
  {
    title: "NatGeo World Map",
    type: "base",
    visible: false,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
    attribution:
      "Tiles © Esri — National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC",
  },
];

export default function Map() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const baseLayers = BASEMAPS.map(
      (basemap) =>
        new TileLayer({
          title: basemap.title,
          type: basemap.type,
          visible: basemap.visible,
          source: new XYZ({
            url: basemap.url,
            attributions: basemap.attribution,
            maxZoom: 15,
          }),
        }),
    );

    const basemapGroup = new LayerGroup({
      title: "Basemaps",
      layers: baseLayers,
    });

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers: [basemapGroup],
      view: new View({
        center: fromLonLat([17.923505641895904, 55.871116255137544]),
        zoom: 5,
        projection: "EPSG:3857",
      }),
    });

    mapInstance.current.addControl(
      new LayerSwitcher({
        // activationMode: "click",
        startActive: false,
        tipLabel: "Layer Controls",
        groupSelectStyle: "group",
      }),
    );

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
          // style layer switcher
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
            borderRadius: "12px ",
            border: "1px solid lightgray ",
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
            position: "static ",
          },
          ".layer-switcher .group": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
          // style zoom buttons
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
