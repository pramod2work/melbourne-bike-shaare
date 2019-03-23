import React from 'react';

const InfoSection = ({ label, value }) => (
  <div style={{ padding: '5px 10px 10px'}}>
    <div style={{ display: 'inline-block', width: '40%'}}>
      <b>{label}: </b>
    </div>
    <div style={{ display: 'inline-block', width: '60%', color: 'blue'}}>
      {value}
    </div>
  </div>
)

export const StationInfo = ({ showModal, showData = {}, toggleBookmark }) => (
  <div style={{
    display: showModal ? 'block' : 'none',
    position: 'fixed',
    width: '80vw',
    minHeight: '40vh',
    top: '10%',
    margin: '10%',
    zIndex: '9',
    backgroundColor: 'gray',
    opacity: '0.8',
    textAlign: 'left'
  }}>
    <InfoSection label="Station Name" value={showData.name} />
    <InfoSection label="Station ID" value={showData.stationId} />
    <InfoSection label="Available Bikes" value={showData.status && showData.status.availableBikes} />
    <InfoSection label="Empty Docks" value={showData.status && showData.status.emptyDocks} />
    <InfoSection label="Total Capacity" value={showData.status && showData.status.capacity} />
    
    <div style={{ padding: '5px 10px 10px'}}>
      <div style={{ display: 'inline-block', width: '40%'}}>
        <b>Bookmark: </b>
      </div>
      <div style={{ display: 'inline-block', width: '60%', color: 'blue'}}>
        <button type="button" onClick={() => toggleBookmark(showData.stationId)}>
          {
            showData.bookmarked ?
              <i className="fas fa-star" style={{ fontSize: '20px', color: 'yellow' }}/>
            : <i className="far fa-star" style={{ fontSize: '20px', color: 'yellow' }}/>
          }
        </button>
      </div>
    </div>
  </div>
);
