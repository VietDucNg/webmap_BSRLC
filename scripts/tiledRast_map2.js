// Base path to the tiled raster folder
const tileBasePath = 'output/tiled_raster/';

// Create a dictionary of tile layers for each year
const tileLayers = {};
for (let year = 2000; year <= 2022; year++) {
    tileLayers[year] = L.tileLayer(`${tileBasePath}${year}/{z}/{x}/{y}.webp`, {
        attribution: '(Pham et al., 2024)',
        tms: 0,
        opacity: 1,
        minZoom:0,
        maxZoom:10,
    });
}

// Initialize a LayerGroup for land cover
const landCoverGroup2 = L.layerGroup(); // Empty LayerGroup

// Add the initial year (2000) to the map
tileLayers[2000].addTo(landCoverGroup2);

// Slider to toggle between years
const slider = document.getElementById('year-slider-2');
const yearLabel = document.getElementById('year-label-2');

// event listener to update landcover layer from year slider
slider.addEventListener('input', function () {
    const year = slider.value;
    yearLabel.textContent = year; // Update the label
    
    // Remove all layers from the group
    landCoverGroup2.clearLayers();

    // Add the selected year's layer
    tileLayers[year].addTo(landCoverGroup2);
});

//// Add event listener to update layer opacity
const opa_slider = document.getElementById('opacity-slider');
opa_slider.addEventListener('input', function () {
    const opacity = parseFloat(this.value);
    landCoverGroup2.eachLayer(layer => layer.setOpacity(opacity));
});

// Export the layer group for use in other scripts
export { landCoverGroup2 };