import React from 'react';
import GoogleMapReact from 'google-map-react';

// Refer to https://github.com/google-map-react/google-map-react
// for API documentation on the component

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MELBOURNE_POI = {
  location: {
    lat: -37.8112451,
    lng: 144.9543962,
  },
  label: 'Melbourne',
};

export class BikeStationMap extends React.Component {
  static defaultProps = {
    center: MELBOURNE_POI.location,
    zoom: 13,
  };

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={MELBOURNE_POI.location.lat}
          lng={MELBOURNE_POI.location.lng}
          text={MELBOURNE_POI.label}
        />
      </GoogleMapReact>
    );
  }
}
