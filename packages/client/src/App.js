import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './client/client';
import { BikeStations } from './components/BikeStations';
import { BikeStationMap } from './components/BikeStationMap';
import './App.css';

// TODO: get your own google API key here - https://developers.google.com/maps/documentation/javascript/get-api-key
// Just need to check the maps option, copy the key and paste in here and leave a comment in COMMENTS.md on what is the
// best practice for handling this moving forward.
const GOOGLE_MAPS_API_KEY = 'AIzaSyA5h0z-FzGsYNo9ZLDDPe7nyMarIBPmy6w';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div style={{ height: '100vh', width: '100%' }}>
            <BikeStations />
            <BikeStationMap googleMapsApiKey={GOOGLE_MAPS_API_KEY} />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
