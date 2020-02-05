## Config info
- versions
  - ruby 2.5.1
  - node 13.7.0 (stable)
- System dependencies
  - see package.json; gemfile
- Configuration
  - see config/webpack/development.js:
     - delete nodeModules from loaders (to allow mapbox to work)


## Notes
- apparently, people assume 1000W/m2 "light power" at 35˚ latitude: https://en.wikipedia.org/wiki/Nominal_power_(photovoltaic)
- in lieu of better data, assume 1000W/m2 comprises the theoretical maximum light power at the Tropic of Cancer (23.5˚), and Capricorn (-23.5˚).
- beyond +/- 23.5˚ latitude, however, this nominal light power (theoretical maximum) should decline based on the angle of the panels—(which never situate directly under the sun) and Beer-Lambert–(out of scope)
  - sine of the angle to find projection ratio facing the sun, as compared to direct sunlight achieve within the ToCs
  - angle taken from conversion, of latitude between pole and equator
