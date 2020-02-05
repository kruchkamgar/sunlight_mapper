
export function polygonCoordinates(initialCoordinates) {
  let polygonAdjustments = [[0,0],[.0005,0],[.0005,.0005],[0,.0005], [0,0]]

  let polygon =
  polygonAdjustments
  .map( (element, index) =>
    [ parseFloat(
        (initialCoordinates[0] + element[0]).toFixed(5) ),
      parseFloat(
        (initialCoordinates[1] + element[1]).toFixed(5) ) ]
  );
  return polygon;
}

export function drawPolygon(map, coordinates) {
  if (map.getLayer('polygon')){
    	map.removeLayer('polygon');
  }
  if (map.getSource('solarArray')){
  	map.removeSource('solarArray');
  }

  addSourceData(map, coordinates);
}

function addSourceData(map, coordinates){
  map.addSource('solarArray', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
        'coordinates': [coordinates]
          // 'coordinates': [[
          //     [-67.13734351262877, 45.137451890638886],
          //     [-66.96466, 44.8097],
          //     [-68.03252, 44.3252],
          //     [-69.06, 43.98] ]]
      } }
  });

  map.addLayer({
    'id': 'polygon',
    'type': 'fill',
    'source': 'solarArray',
    'layout': {},
    'paint': {
      'fill-color': '#088',
      'fill-opacity': 0.8
    }
  });
}

export default { drawPolygon, polygonCoordinates }
