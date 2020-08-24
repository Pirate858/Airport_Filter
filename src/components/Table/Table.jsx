import React, { useContext } from 'react';
import './Table.scss';
import { FilterContext } from '../../context/FilterContext';

const Table = () => {
  const { state } = useContext(FilterContext);
  const { airportData, headerData } = state;

  return (
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            {headerData.map((data, key) => {
              if (data !== 'id') {
                return (
                  <th key={key} scope="col">
                    {data.charAt(0).toUpperCase() + data.slice(1)}
                  </th>
                );
              } else {
                return null;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {airportData.map((data) => {
            const { id, name, icao, iata, elevation, latitude, longitude, type } = data;
            if (id) {
              return (
                <tr key={id}>
                  <td data-title="name" className="truncate-name">
                    {name}
                  </td>
                  <td data-title="icao">{icao}</td>
                  <td data-title="iata">{iata}</td>
                  <td data-title="elevation">{elevation}</td>
                  <td data-title="latitude">{latitude}</td>
                  <td data-title="longitude">{longitude}</td>
                  <td data-title="type">{type}</td>
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
