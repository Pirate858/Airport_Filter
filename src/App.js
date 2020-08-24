import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { FilterProvider } from './context/FilterContext';

const App = () => {
  return (
    // Providing Global state through Context Provider
    <FilterProvider>
      <HomePage />
    </FilterProvider>
  );
};

export default App;
