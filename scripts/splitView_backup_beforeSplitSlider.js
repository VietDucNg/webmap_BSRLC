// Import the landCoverGroup from tiledRast_map2.js
import { landCoverGroup2 } from './tiledRast_map2.js';
import { map } from './main.js';

const container1 = document.getElementById('map');
const container2 = document.getElementById('map2');
const slider1 = document.getElementById('slider-container');
const slider2 = document.getElementById('slider-container2');

// Create a split view button functionality
document.getElementById('split-view-btn').addEventListener('click', () => {
    if (container1.classList.contains('split-map')) {
        // Switch back to single map
        container1.classList.remove('split-map');
        container1.classList.add('single-map')
        container2.classList.remove('split-map2')
        container2.classList.add('hidden')
        // switch back to slider single map styling
        slider1.classList.remove('split-year-slider');
        slider2.classList.remove('split-year-slider2');
        slider2.classList.add('hidden')

        // tell leaflet to re-calculate map's dimensions
        map.invalidateSize();

    } else {
        //// change the year slider 1 to split view styling mode
        slider1.classList.add('split-year-slider');

        //// change the year slider 2 to split view styling mode 2
        slider2.classList.remove('hidden');
        slider2.classList.add('split-year-slider2');

        // // Enable split view
        container1.classList.remove('single-map')
        container1.classList.add('split-map');
        container2.classList.remove('hidden')
        container2.classList.add('split-map2')

        // Update map 1's center and dimensions
        map.invalidateSize();
       
        // Initialize 2nd map
        var map2 = L.map('map2',{minZoom:0, maxZoom:10}).setView([55.871116255137544, 17.923505641895904],5);

        //// add basemap
        var base_topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',maxZoom: 10
        }).addTo(map2);

        var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC', maxZoom: 10
        });
        
        // add landcover layer
        landCoverGroup2.addTo(map2);

        landCoverGroup2.eachLayer(layer => {
            map2.removeLayer(layer); // Remove if previously added
            layer.addTo(map2);       // Re-add to ensure rendering
        });
        
        //// add popup with coordinates when clicked
        var popup = L.popup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent(e.latlng.lat.toFixed(5).toString() + ', ' +
                e.latlng.lng.toFixed(5).toString())
                .openOn(map2);
        }
        map2.on('click', onMapClick);

        //// add coordinates information when mouse hover
        // Get reference to the coordinates display element
        var coordDisplay = document.getElementById('coordInfo');
        // Update coordinates when the mouse moves over the map
        map2.on('mousemove', function (e) {
            coordDisplay.innerHTML = 'Lat: ' + e.latlng.lat.toFixed(5) + ', Long: ' + e.latlng.lng.toFixed(5);
        });

        //// add layers control
        // create control object 
        var baseLayers = {
            'Esri Topo': base_topo,
            'Esri Geo': Esri_NatGeoWorldMap
        };
        var landCoverLayer = {
            'Land Cover (2000-2022)': landCoverGroup2
        }
        // add layer control to map
        L.control.layers(baseLayers, landCoverLayer,{position:'topright'}).addTo(map2);
        
        //// add scale control to map
        L.control.scale({ position: 'bottomleft' }).addTo(map2);

        //// sync 2 maps
        map.sync(map2);
        map2.sync(map);
    }
});
