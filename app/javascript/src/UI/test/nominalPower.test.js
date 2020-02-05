import { calcNominalPower } from '../logic/nominalPower'

test('returns nominal power', () => {
  let polygonArea = 1000;
  let coordinates =  [
        [ 50.001, 20.002 ],
        [ 50.0005, 20.002 ],
        [ 50.0005, 20.0025 ],
        [ 50.001, 20.0025 ],
        [ 50.001, 20.002 ]
      ]
  let nominalPower = calcNominalPower(polygonArea, coordinates)
  // .165 efficiency
  expect(nominalPower).toBe(165000);
})

test('returns nominal power –latitude > 23.5', () => {
  let polygonArea = 1000;
  let coordinates =  [
        [ -70.001, 40.002 ],
        [ -70.0005, 40.002 ],
        [ -70.0005, 40.0025 ],
        [ -70.001, 40.0025 ],
        [ -70.001, 40.002 ]
      ]
  let nominalPower = calcNominalPower(polygonArea, coordinates)
  // .165 efficiency
  expect(nominalPower).toBe(158203.62);
})
