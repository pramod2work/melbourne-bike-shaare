export const MELBOURNE_POI = {
  location: {
    lat: -37.8112451,
    lng: 144.9543962,
  },
  label: 'Melbourne',
};

export const isCurrentDock = ({ lat, lng } = {}, dockLocation) => {
  if (!lat || !lng || !dockLocation) return

  const currentLat = lat && lat.toFixed(5)
  const currentLng = lng && lng.toFixed(5)
  const dockLat = dockLocation.lat && dockLocation.lat.toFixed(5)
  const dockLng = dockLocation.lng && dockLocation.lng.toFixed(5)

  return currentLat === dockLat && currentLng === dockLng
}