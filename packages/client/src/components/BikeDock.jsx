import React from 'react';

export const BikeDock = ({
  status,
  $hover,
  isCenter,
  filterByDocks,
  bookmarked
}) => (
  <div>
    <div
      style={{
        color: 'white', 
        background: isCenter ? '#2d90ec' : 'grey',
        padding: `${($hover && isCenter && 10) || (((filterByDocks ? status.emptyDocks : status.availableBikes) || 5 )/3) * 5}px`,
        minHeight: '3%',
        minWidth: '3%',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
      }}
    />
    {
      bookmarked ?
        <i className="fas fa-star" style={{ fontSize: '12px', color: 'red' }}/>
      : ''
    }
  </div>
);
