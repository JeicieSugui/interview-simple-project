// add your javascript code here
var map = L.map('map').setView([11, 123], 6);

L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=Ha56is8yKNVXNA3PxaCu', {
attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>', 
 }).addTo(map);




    let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(
            "You clicked the map at -<br>" + 
            "<b>lon:</b> " + e.latlng.lng + "<br>" + 
            "<b>lat:</b> " + e.latlng.lat
        )
        .openOn(map);
}
map.addEventListener("click", onMapClick);


function getColor(d) {
    return d > 1000 ? '#158cea' :
           d > 500  ? '#d200ff' :
           d > 200  ? '#f0180f' :
           d > 100  ? '#e8ff00' :
           d > 50   ? '#18e738' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.ID_2),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: 'gray',
        fillColor: 'white',
        fillOpacity: 0.2
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}


function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(PH_MunicipalMap, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//L.geoJson(PHmap).addTo(map);

var myStyle = {
    "color": "#fd1a02",
    "weight": 5,
    "opacity": 0.65
};

L.geoJSON(PARmap, {
    style: myStyle
}).addTo(map);



