const { keyBy } = require('lodash');
const path = require('path');
const { importCsv } = require('../csv/csvHelper');

const loadData = async () => {
  const stationData = await importCsv(
    path.join(__dirname, './data/Bike_Share_Dock_Locations.csv'),
  );
  const stationStatusData = await importCsv(
    path.join(
      __dirname,
      './data/Melbourne_Bike_Share_stations__with_current_number_of_free_and_used_docks__every_15_minutes_.csv',
    ),
  );

  const stationStatusIndex = keyBy(stationStatusData, 'station_id');

  return stationData.map(station => {
    const status = stationStatusIndex[station.station_id];
    return {
      stationId: station.station_id,
      name: station.name,
      location: {
        lat: station.lat,
        lng: station.lng,
      },
      status: {
        availableBikes: status ? status.available_bikes : null,
        emptyDocks: status ? status.empty_docks : null,
        capacity: status ? status.capacity : null,
      },
    };
  });
};

// Lazy-load the data and cache it statically to prevent reloading
let stations = null;
const getBikeStations = async () => {
  if (!stations) {
    stations = await loadData();
  }
  return stations;
};

module.exports = { getBikeStations };
