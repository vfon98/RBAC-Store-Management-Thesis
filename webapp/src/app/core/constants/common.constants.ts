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

export enum LANGUAGE_CODE {
  EN = 'en-US',
  VN = 'vi-VN'
}

export enum ORDER_STATUS {
  SHIPPING = 0,
  SHIPPED = 1,
// //    STANDARD
// PENDING,
//   SHIPPING,
//   SHIPPING_SUCCESS,
//
// //    EXTENDED
//   STORE_APPROVED,
//   CUSTOMER_CANCELED,
//   STORE_CANCELED,
//   CUSTOMER_REJECTED,
//   SHIPPING_FAILED,
//   INVALID,
//   EXPIRED,
//   CUSTOMER_REFUND
}

export default CONSTANTS;
