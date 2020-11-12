const CONSTANTS = {
  // Can Tho University coordinate
  DEFAULT_LATITUDE: 10.030259,
  DEFAULT_LONGITUDE: 105.771802,
}

export enum AgmMapType {
  STREET = 'street view',
  SATELLITE = 'satellite',
  NORMAL = 'normal'
}

export enum AgmZoom {
  WORLD = 1,
  CONTINENT = 5,
  REGION = 8,
  CITY = 10,
  STREETS = 15,
  BUILDINGS = 20
}

export default CONSTANTS;
