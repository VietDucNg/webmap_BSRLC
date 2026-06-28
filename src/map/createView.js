import { View } from "ol";
import { fromLonLat } from "ol/proj";

export const DEFAULT_CENTER_LON_LAT = [17.923505641895904, 55.871116255137544];
export const DEFAULT_ZOOM = 5;
export const DEFAULT_PROJECTION = "EPSG:3857";

export function createView() {
  return new View({
    center: fromLonLat(DEFAULT_CENTER_LON_LAT),
    zoom: DEFAULT_ZOOM,
    projection: DEFAULT_PROJECTION,
  });
}
