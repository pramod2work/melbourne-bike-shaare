import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import AppComponent, { App } from './App';
import * as clientApollo from './client/client'
import { GET_BIKE_STATIONS } from './client/graphqlSchema';

// Enzyme configure is placed here as jest config setup is with in cra
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component tests', () => {
  it('client query to fetch station details to be called', () => {
    clientApollo.client = {
      query: jest.fn(() => ({
        then: jest.fn(() => {})
      }))
    };
    const div = document.createElement('div');
    ReactDOM.render(<AppComponent />, div);
    expect(clientApollo.client.query).toHaveBeenCalledWith({
      query: GET_BIKE_STATIONS
    });
  });

  it('Handle loading response from query request', () => {
    const thenSpy = jest.fn((callback) => callback({ loading: true }))
    clientApollo.client = {
      query: jest.fn(() => ({
        then: thenSpy
      }))
    };
    
    const wrapper = shallow(<App />);

    expect(thenSpy).toHaveBeenCalled();
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('Handle error response from query request', () => {
    const thenSpy = jest.fn((callback) => callback({ error: { message: 'Failed' } }))
    clientApollo.client = {
      query: jest.fn(() => ({
        then: thenSpy
      }))
    };
    
    const wrapper = shallow(<App />);
    expect(wrapper.state().loading).toBeFalsy();
    expect(wrapper.state().error).toBe('Failed');
  });

  it('Handle Success response from query request', () => {
    const thenSpy = jest.fn((callback) => callback({ data: { bikeStations: [1,2] } }))
    clientApollo.client = {
      query: jest.fn(() => ({
        then: thenSpy
      }))
    };
    
    const wrapper = shallow(<App />);
    expect(wrapper.state().loading).toBeFalsy();
    expect(wrapper.state().data).toEqual([1,2]);
  });

  it('Do not show info for no data', () => {
    const wrapper = shallow(<App />);
    wrapper.instance().toggleDockInfo();
    expect(wrapper.state().showModal).toBeFalsy();
    expect(wrapper.state().dockData).toBeUndefined();
  });

  it('Show info for data', () => {
    const dummyData = { dummyValue: true };
    const wrapper = shallow(<App />);
    wrapper.instance().toggleDockInfo(dummyData);
    expect(wrapper.state().showModal).toBeTruthy();
    expect(wrapper.state().dockData).toBe(dummyData);
  });
});
