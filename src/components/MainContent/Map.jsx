import { useEffect, useRef } from "react";
import OLMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import LayerSwitcher from "ol-layerswitcher";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { Box } from "@mui/material";

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

    const layers = BASEMAPS.map(
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

    mapInstance.current = new OLMap({
      target: mapRef.current,
      layers,
      view: new View({
        center: fromLonLat([17.923505641895904, 55.871116255137544]),
        zoom: 5,
        projection: "EPSG:3857",
      }),
    });

    mapInstance.current.addControl(
      new LayerSwitcher({
        activationMode: "click",
        startActive: true,
        tipLabel: "Basemaps",
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
    <Box
      ref={mapRef}
      sx={{
        height: "100%",
        width: "100%",
      }}
    />
  );
}
