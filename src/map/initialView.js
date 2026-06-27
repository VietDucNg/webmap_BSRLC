import { View } from "ol";
import { fromLonLat } from "ol/proj";

export const initialView = new View({
  center: fromLonLat([17.923505641895904, 55.871116255137544]),
  zoom: 5,
  projection: "EPSG:3857",
});
