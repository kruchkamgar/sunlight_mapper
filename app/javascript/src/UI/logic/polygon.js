
export function polygonCoordinates(initialCoordinates) {
  const polygonAdjustments = [[0,0],[.0005,0],[.0005,.0005],[0,.0005], [0,0]]

  const polygon =
  polygonAdjustments
  .map( (adjustment, index) =>
    [ parseFloat(
        (initialCoordinates[0] + adjustment[0]).toFixed(5) ),
      parseFloat(
        (initialCoordinates[1] + adjustment[1]).toFixed(5) ) ]
  );
  return polygon;
}

export function drawPolygon(map, coordinates, nominalPower) {
  if (map.getSource('solarArray')){
    map.removeLayer('label');
    map.removeSource('point');
    map.removeLayer('polygon');
    map.removeSource('solarArray');
  }

  addSourceData(map, coordinates);
  addSourceLabel(map, coordinates, nominalPower);
}

function addSourceLabel(map, coordinates, nominalPower) {
  const position = [
    coordinates[2][0], coordinates[3][1] + .0002 ]
  map.addSource('point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': position // top right corner of polygon
        }
      }] } // data
  });

  map.addLayer({
    'id': 'label',
    'type': 'symbol',
    'source': 'point',
    'layout': {
      'text-field': 'nominalPower: ' + (nominalPower/1000).toFixed(2) + ' kW',
      'text-size': 14,
      'text-max-width': 15
    }
  });
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
