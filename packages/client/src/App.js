import React, { Component } from 'react';
import { graphql, ApolloProvider } from 'react-apollo';

import { GET_BIKE_STATIONS, updateBookmark } from './client/graphqlSchema';
import { BikeStationMap } from './components/BikeStationMap';
import './App.css';
import { StationInfo } from './components/StationInfo';
import { client } from './client/client';

// TODO: get your own google API key here - https://developers.google.com/maps/documentation/javascript/get-api-key
// Just need to check the maps option, copy the key and paste in here and leave a comment in COMMENTS.md on what is the
// best practice for handling this moving forward.
const GOOGLE_MAPS_API_KEY = 'AIzaSyA5h0z-FzGsYNo9ZLDDPe7nyMarIBPmy6w';

export class App extends Component {
  state = { loading: true, data: [], filterBy: 'availableBikes' }

  componentDidMount () {
    client.query({ query: GET_BIKE_STATIONS })
    .then(({ loading, error, data }) => {
        if (loading) {
          this.setState({ loading, });
        } else if (error) {
          this.setState({ loading: false, data: [], error: error.message });
        } else {
          this.setState({ loading: false, error: '', data: [ ...data.bikeStations ]})
        }
    })
  }

  toggleDockInfo = (dockData) => {
    this.setState({
      showModal: !!dockData,
      dockData
    })
  }

  toggleBookmark = (stationId) => {
    this.props.mutate({
      variables: { stationId, bookmarked: !this.state.dockData.bookmarked }
    })
    .then(({ data }) => {
      const { updateBookmark } = data
      const updatedData = this.state.data.map((bikeStation) => {
        if (bikeStation.stationId === updateBookmark.stationId) {
          return updateBookmark;
        }
    
        return bikeStation;
      })
      this.setState({
        loadingUpdate: false,
        error: '',
        dockData: {
          ...updateBookmark
        },
        data: updatedData
      })
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    });
  }

  setFilterBy = (filterBy) => {
    this.setState({
      filterBy
    })
  }

  render() {
    const { data, error, loading } = this.state
    return (
      <div className="App">
        { loading ? <div>Loading...</div> : ''}
        { error ? <div>{error}</div> : ''}
        {
          data ?
          <div>
            <div style={{ padding: '10px' }}>
              <div style={{ display: 'inline-block', width: '40%' }}>
                <b>Filter By: </b>
              </div>
              <div style={{ display: 'inline-block', width: '60%' }}>
                <label htmlFor="filterByBike">Available Bikes</label>
                <input type="radio" id="filterByBike" name="filterBy" onChange={() => this.setFilterBy('availableBikes')} checked={this.state.filterBy === 'availableBikes'} value="availableBikes" />
                <br />
                <br />
                <label htmlFor="filterByDock">Empty Docks</label>
                <input type="radio" id="filterByDock" name="filterBy" onChange={() => this.setFilterBy('emptyDocks')} checked={this.state.filterBy === 'emptyDocks'} value="emptyDocks" />
              </div>
            </div>

            <BikeStationMap
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              bikeStations={data}
              toggleDockInfo={this.toggleDockInfo}
              filterByDocks={this.state.filterBy === 'emptyDocks'}
            />
          </div>
          : ''
        }
        <StationInfo
          showModal={this.state.showModal}
          showData={this.state.dockData}
          toggleBookmark={this.toggleBookmark}
        />
      </div>
    );
  }
}

const AppComponent = graphql(updateBookmark)(App);

const EnhancedComponent = () => (
  <ApolloProvider client={client}><AppComponent /></ApolloProvider>
)

export default EnhancedComponent;
