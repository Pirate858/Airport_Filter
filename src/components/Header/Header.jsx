import React from 'react';
import './Header.scss';
import { Microsoft } from '@styled-icons/boxicons-logos';

const Header = () => {
  return (
    <div className="header-container">
      <h1 className="header">
        Filter <span className="inner-header">Airports</span>{' '}
      </h1>
      <Microsoft size={24} className="header-icon" />
    </div>
  );
};

export default Header;
