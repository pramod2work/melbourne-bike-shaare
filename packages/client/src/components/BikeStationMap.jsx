import React from 'react';
import GoogleMapReact from 'google-map-react';

// Refer to https://github.com/google-map-react/google-map-react
// for API documentation on the component

import { BikeDock } from './BikeDock';
import { MELBOURNE_POI, isCurrentDock } from '../utils';

export class BikeStationMap extends React.Component {
  state = { currentCenter: {} };

  static defaultProps = {
    center: MELBOURNE_POI.location,
    zoom: 13,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dockInfo !== this.state.dockInfo) {
      this.props.toggleDockInfo(this.state.dockInfo ? this.state.dockInfo : '')
    }
  }

  setCurrentCenter = ({ lat, lng, zoom }) => {
    this.setState({
      currentCenter: { lat, lng },
      zoom
    })
  }

  setZoomTo = (dock) => {
    this.setState({
      center: dock.location,
      zoom: 18,
      dockInfo: dock
    })
  }

  render() {
    return (
      <div style={{ height: '86vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: this.props.googleMapsApiKey }}
          center={this.state.center || this.props.center}
          zoom={this.state.zoom || this.props.zoom}
          onChildClick={(event1, bikeDock) => { this.setZoomTo(bikeDock) }}
          onClick={() => { this.setState({ dockInfo: '' }) }}
          onChange={({ center, zoom }) => { this.setCurrentCenter({ ...center, zoom }) }}
        >
          {
            this.props.bikeStations.map((bikeDock) => (
              <BikeDock
                {...bikeDock.location}
                {...bikeDock}
                key={bikeDock.stationId}
                filterByDocks={this.props.filterByDocks}
                isCenter={isCurrentDock(this.state.currentCenter, bikeDock.location)}
              />
            ))
          }
        </GoogleMapReact>
      </div>
    );
  }
}
