import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

const bsrlcLayer = new TileLayer({
  title: "BSRLC Layer",
  type: "overlay",
  visible: true,
  source: new XYZ({
    url: "https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_2014_web_tif/MapServer/tile/{z}/{y}/{x}",
    attributions:
      "Vu-Dong Pham, Farina de Waard, Fabian Thiel, Bernd Bobertz, Christina Hellmann, Duc-Viet Nguyen, Felix Beer, M. Arasumani, Marcel Schwieder, Jörg Hartleib, David Frantz & Sebastian van der Linden",
    maxZoom: 15,
  }),
});

export const bsrlcGroup = new LayerGroup({
  title: "Layers",
  layers: [bsrlcLayer],
});
