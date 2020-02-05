// assumption 1: sunlight, hitting the panel-face at an angle, maintains the same conversion rate as compared with directly perpendicular
// assumption 2: panels lie flat /parallel to the surface of earth (for base power calculation)
  // - does not consider attenuation: https://en.wikipedia.org/wiki/Beer%E2%80%93Lambert_law#Expression_with_attenuation_coefficient
export function calcNominalPower(area, coordinates) {
// convert the area to that of a projected polygon——
  // assumptions
  let nominalLightPower = 1000; // W/m2
  let typicalEfficiency = .165;
  let nominalPower = nominalLightPower * typicalEfficiency;
  let nominalPowerTotal = nominalPower * area;

  // contingency: use the coordinates to derive the angle of the earth with respect to sunlight source
  // standard for calculating nominal light power (35˚ latitude, yet with angled panels)
  // I assume this maximum light power for 23.5˚, Tropic of Cancer, for unangled panels
  let equatorLatitude = 90;
  let nominalLightLatitude = 23.5;

  let latitude = Math.abs(coordinates[0][1])
  if (latitude > 23.5) {
    let angleAwayFromPlane = latitude - nominalLightLatitude;
    // use the cosine of the angle (adjascent over hypotenuse) to derive the projection ratio
    const angleToRadians = Math.PI/180;
    let projectionRatio =
    Math.cos(
      angleAwayFromPlane * angleToRadians );
    // multiply the area by the projection ratio
    let projectedArea = area * projectionRatio;
    // convert the project area into a solar rating——
    nominalPowerTotal = nominalPower * parseFloat(projectedArea);
  }
  return parseFloat(
    nominalPowerTotal.toFixed(2) );
}

export default calcNominalPower
