import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

const BSRLC_LAYER_URL_TEMPLATE =
  "https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_{year}_web_tif/MapServer/tile/{z}/{y}/{x}";

export function getBsrlcLayerUrl(year) {
  return BSRLC_LAYER_URL_TEMPLATE.replace("{year}", year);
}

export function CreateBsrlcLayer(year) {
  const source = new XYZ({
    url: getBsrlcLayerUrl(year),
    attributions: "(Pham et al., 2024)",
    maxZoom: 15,
  });

  const layer = new TileLayer({
    title: "BSRLC Layer",
    type: "overlay",
    visible: true,
    opacity: 1,
    source,
  });

  return {
    layer,
    source,
  };
}
