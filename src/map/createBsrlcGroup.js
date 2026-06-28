import LayerGroup from "ol/layer/Group";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";

export function CreateBsrlcGroup(yearA) {
  const source = new XYZ({
    url: `https://ifzo-gis.geo.uni-greifswald.de/server/rest/services/Hosted/BSRLC_${yearA}_web_tif/MapServer/tile/{z}/{y}/{x}`,
    attributions:
      "Vu-Dong Pham, Farina de Waard, Fabian Thiel, Bernd Bobertz, Christina Hellmann, Duc-Viet Nguyen, Felix Beer, M. Arasumani, Marcel Schwieder, Jörg Hartleib, David Frantz & Sebastian van der Linden",
    maxZoom: 15,
  });

  const layer = new TileLayer({
    title: "BSRLC Layer",
    type: "overlay",
    visible: true,
    opacity: 1,
    source,
  });

  const group = new LayerGroup({
    title: "Layers",
    layers: [layer],
  });

  return {
    group,
    layer,
    source,
  };
}
