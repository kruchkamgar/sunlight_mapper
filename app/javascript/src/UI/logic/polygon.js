
export function polygonCoordinates(initialCoordinates) {
  polygonAdjustments = [[0,0],[1,0],[1,1],[0,1]]

  return polygonCoordinates =
  polygonAdjustments
  .map( (element, index) =>
    [ initialCoordinates[0] + element[0],
      initialCoordinates[1] + element[1] ] )
}

export function drawPolygon(map, coordinates) {
  map.addSource('solarArray', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'geometry': {
        'type': 'Polygon',
          'coordinates': [[
              [-67.13734351262877, 45.137451890638886],
              [-66.96466, 44.8097],
              [-68.03252, 44.3252],
              [-69.06, 43.98] ]]
      } }
  });
}

export default { drawPolygon, polygonCoordinates }
