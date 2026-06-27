import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

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

export const basemapGroup = new LayerGroup({
  title: "Basemaps",
  layers: baseLayers,
});
