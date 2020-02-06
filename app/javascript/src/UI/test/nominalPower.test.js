import { calcNominalPower } from '../logic/nominalPower'

test('returns nominal power', () => {
  const polygonArea = 1000;
  const coordinates =  [
        [ 50.001, 20.002 ],
        [ 50.0005, 20.002 ],
        [ 50.0005, 20.0025 ],
        [ 50.001, 20.0025 ],
        [ 50.001, 20.002 ]
      ]
  const nominalPower = calcNominalPower(polygonArea, coordinates)
  // .165 efficiency
  expect(nominalPower).toBe(165000);
})

test('returns nominal power –latitude > 23.5', () => {
  const polygonArea = 1000;
  const coordinates =  [
        [ -70.001, 40.002 ],
        [ -70.0005, 40.002 ],
        [ -70.0005, 40.0025 ],
        [ -70.001, 40.0025 ],
        [ -70.001, 40.002 ]
      ]
  const nominalPower = calcNominalPower(polygonArea, coordinates)
  // .165 efficiency
  expect(nominalPower).toBe(158203.62);
})
