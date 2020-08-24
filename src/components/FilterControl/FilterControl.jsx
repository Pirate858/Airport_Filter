import React, { useContext } from 'react';
import Checkbox from './Checkbox/Checkbox';
import './FilterControl.scss';
import { FilterContext } from '../../context/FilterContext';

const FilterControl = () => {
  const Options = ['small', 'medium', 'large', 'heliport', 'closed', 'inYourfavourites'];

  const { handleChange } = useContext(FilterContext);

  return (
    <div className="filter-control-container">
      <div className="type-filter">
        <h3 className="filter-title">
          <strong>Type</strong>
        </h3>
        <div className="checkbox-container">
          {Options.map((option, key) => (
            <span key={key} style={{ display: 'flex' }}>
              <Checkbox name={option} onChange={handleChange} />
            </span>
          ))}
        </div>
      </div>
      <div className="search-filter">
        <h3 className="filter-title">
          <strong>Filter by Search</strong>
        </h3>
        <input type="text" name="searchFilter" id="filter-search-input" placeholder="Search" onChange={handleChange} />
      </div>
    </div>
  );
};

export default FilterControl;
