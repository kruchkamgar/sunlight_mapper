import { polygonCoordinates } from '../logic/polygon'

test('returns polygon coordinates', () => {
  let polygon = polygonCoordinates([-70.001, 40.002])
  console.log(polygon);
  expect(typeof polygon).toBe('object')
})

test('returns geojson polygon object', () => {
  // let polygon = polygonCoordinates([-70.001, 40.002])
  // console.log(polygon);
  // expect(typeof polygon).toBe('object')
})
