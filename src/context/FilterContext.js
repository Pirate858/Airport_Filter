import React, { useState, useEffect } from 'react';
import data from '../data/airports.json';

const FilterContext = React.createContext();

const FilterProvider = (props) => {
  //Defining Global state object
  const [state, setState] = useState({
    small: false,
    medium: false,
    large: false,
    heliport: false,
    closed: false,
    inYourfavourites: false,
    airportData: [],
    headerData: [],
    postPerPage: 4,
    currentPage: 1,
    isLastPage: false,
    totalContent: data.length,
    searchFilter: '',
  });
  // Helper method for data formatting
  const formatItems = (items) => {
    const filteredItems = filterData(items);
    setState((prevState) => {
      return { ...prevState, totalContent: filteredItems.length };
    });

    const indexOfLast = state.currentPage * state.postPerPage;
    const indexOfFirst = indexOfLast - state.postPerPage;
    const currentList = filteredItems.slice(indexOfFirst, indexOfLast);
    if (currentList.length !== state.postPerPage || indexOfLast === data.length) {
      setState((prevState) => {
        return { ...prevState, isLastPage: true };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, isLastPage: false };
      });
    }

    let tempItems = currentList.map((item) => {
      let { id, name, icao, iata, elevation, latitude, longitude, type } = item;
      const latlongConvert = convertDMS(latitude, longitude);

      let sortedData = {
        id,
        name,
        icao,
        iata,
        elevation,
        latitude: latlongConvert.latitude,
        longitude: latlongConvert.longitude,
        type,
      };
      return sortedData;
    });
    return tempItems;
  };
  // Helper method for Lat/Long proper format
  const toDegreesMinutesAndSeconds = (coordinate) => {
    let absolute = Math.abs(coordinate);
    let degrees = Math.floor(absolute);
    let minutesNotTruncated = (absolute - degrees) * 60;
    let minutes = Math.floor(minutesNotTruncated);
    let seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + ' ' + minutes + ',' + seconds + "'";
  };

  const convertDMS = (lat, lng) => {
    let latitude = toDegreesMinutesAndSeconds(lat).toString();
    let latitudeCardinal = lat >= 0 ? 'N' : 'S';
    latitude = latitudeCardinal + ' ' + latitude;
    let longitude = toDegreesMinutesAndSeconds(lng).toString();
    let longitudeCardinal = lng >= 0 ? 'E' : 'W';
    longitude = longitudeCardinal + ' ' + longitude;
    const convertedValues = { latitude, longitude };
    return convertedValues;
  };
  // Filter Criteria for checkboxes and searching names
  const filterData = (arr) => {
    const { small, medium, large, heliport, closed, inYourfavourites, searchFilter } = state;
    let tempData = [];
    if (small) {
      let smallData = arr.filter((data) => data.type === 'small');
      tempData = [...smallData, ...tempData];
    }
    if (medium) {
      let mediumData = arr.filter((data) => data.type === 'medium');
      tempData = [...mediumData, ...tempData];
    }
    if (large) {
      let largeData = arr.filter((data) => data.type === 'large');
      tempData = [...largeData, ...tempData];
    }
    if (heliport) {
      let heliportData = arr.filter((data) => data.type === 'heliport');
      tempData = [...heliportData, ...tempData];
    }
    if (closed) {
      let closedData = arr.filter((data) => data.type === 'closed');
      tempData = [...closedData, ...tempData];
    }
    if (inYourfavourites) {
      let favData = arr.filter((data) => data.type === 'inYourfavourites');
      tempData = [...favData, ...tempData];
    }
    // Checking Filter Search
    if (tempData.length === 0) {
      let searchResult = [];
      if (searchFilter.length > 0) {
        arr.map((element) => (element.name.search(searchFilter) !== -1 ? searchResult.push(element) : arr));
      }
      if (searchResult.length === 0) {
        return arr;
      } else {
        return searchResult;
      }
    } else {
      let searchResult = [];
      if (searchFilter.length > 0) {
        tempData.map((element) => (element.name.search(searchFilter) !== -1 ? searchResult.push(element) : tempData));
      }
      if (searchResult.length === 0) {
        return tempData;
      } else {
        return searchResult;
      }
    }
  };

  useEffect(() => {
    const sortedAirports = formatItems(data);
    setState((prevState) => {
      return {
        ...prevState,
        airportData: sortedAirports,
        headerData: Object.keys(sortedAirports[0]),
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.currentPage,
    state.small,
    state.medium,
    state.large,
    state.closed,
    state.heliport,
    state.inYourfavourites,
    state.totalContent,
    state.searchFilter,
  ]);
  // Events handlers for Pagination and FilterSearch
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onLeftPaginate = () => {
    setState((prevState) => {
      return { ...prevState, currentPage: state.currentPage - 1 };
    });
  };

  const onRightPaginate = () => {
    setState((prevState) => {
      return { ...prevState, currentPage: state.currentPage + 1 };
    });
  };

  return (
    <FilterContext.Provider value={{ state, handleChange, onLeftPaginate, onRightPaginate }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
