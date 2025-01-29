// Import the landCoverGroup from tiledRast.js
import { landCoverGroup } from './tiledRast.js';

// create map object with initial view and zoom level
export var map = L.map('map',{minZoom:0, maxZoom:10}).setView([55.871116255137544, 17.923505641895904],5);

//// add basemap
var base_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
  maxZoom: 10
}).addTo(map);

var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 10
});

// add landcover layer
landCoverGroup.addTo(map);

//// add popup with coordinates when clicked
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.lat.toFixed(5).toString() + ', ' +
        e.latlng.lng.toFixed(5).toString())
        .openOn(map);
}
map.on('click', onMapClick);


//// add info button
var infoBox = document.getElementById('infoBox');
infoBox.style.display = 'none'
var info_button = L.easyButton('<span>&#8505; top: 400px;</span>', function(){
  // Toggle the display of the info box
  if(infoBox.style.display == 'none') {
    infoBox.style.display = 'block';
  } else {
    infoBox.style.display = 'none';
  }
}).addTo(map);
// add class to style
info_button.button.classList.add('info_button')


//// add coordinates information when mouse hover
// Get reference to the coordinates display element
var coordDisplay = document.getElementById('coordInfo');
// Update coordinates when the mouse moves over the map
map.on('mousemove', function (e) {
    coordDisplay.innerHTML = 'Lat: ' + e.latlng.lat.toFixed(5) + ', Long: ' + e.latlng.lng.toFixed(5);
});


//// add layers control
// create control object 
var baseLayers = {
  'Esri Topo': base_topo,
  'Esri Geo': Esri_NatGeoWorldMap
};
var landCoverLayer = {
  'Land Cover (2000-2022)': landCoverGroup
}
// add layer control to map
L.control.layers(baseLayers, landCoverLayer,{position:'topright'}).addTo(map);

//// add scale control to map
L.control.scale({ position: 'bottomleft' }).addTo(map);
