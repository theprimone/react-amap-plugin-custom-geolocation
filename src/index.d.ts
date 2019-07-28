import React from 'react';

export interface GeolocationProps {
  /** whether location after created */
  autoLocation: boolean;
}

export default class Geolocation extends React.Component<GeolocationProps, any> {}
