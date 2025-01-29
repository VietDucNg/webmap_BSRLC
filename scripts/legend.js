import {map} from './main.js';

//// add legend
var legend = L.control({ position: 'bottomright' }); 

legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'info legend');
    
    // Add the title
    div.innerHTML = "<h4>Land Cover Types</h4>";
    
    var categories = ["Built up",'Bareland',"Water","Shrub land","Broadleaf forest","Coniferous forest","Wetland marsh","Exploited peatbog","Unexploited peatbog","Wheat","Barley","Rye","Oat","Maize","Seed crops","Root crops","Pulses, vegetables","Grassland"]; 
    var colors = ["#ff0000","#969696","#00ccf2","#a6ff00","#009600","#006400","#a6a6ff","#7a4700","#4d4dff","#fbfb16","#e4ce3f","#ea7f12","#b45b61","#b45b61","#ee439c","#9a0cee","#9eac2e","#c1ecd0"]; 

    // Loop through categories and colors to create colored labels
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            `<p style="background: ${colors[i]} ; width: 18px; height: 18px; display: inline-block; margin:0px 8px 0px 0px;"></p>` +
            `<p class = "legend_text" style='display: inline-block; margin:0 0;vertical-align: top; font-size:14px'> ${categories[i]} </p>` + '<br>';
    }
    return div;
};

legend.addTo(map);



