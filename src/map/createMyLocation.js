import Geolocation from "ol/Geolocation";

export function createMyLocation(view) {
  const geolocation = new Geolocation({
    projection: view.getProjection(),
    trackingOptions: {
      enableHighAccuracy: true,
    },
  });

  geolocation.on("change:position", () => {
    const coordinates = geolocation.getPosition();
    if (coordinates) {
      view.animate({
        center: coordinates,
        zoom: 14,
        duration: 700,
      });
    }
    geolocation.setTracking(false);
  });

  geolocation.on("error", (error) => {
    console.error("Geolocation error:", error);
    geolocation.setTracking(false);
  });

  return geolocation;
}
