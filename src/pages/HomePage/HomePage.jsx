import React from 'react';
import Header from '../../components/Header/Header';
import FilterControl from '../../components/FilterControl/FilterControl';
import Table from '../../components/Table/Table';
import Paginate from '../../components/Paginate/Paginate';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="container">
      <Header />
      <FilterControl />
      <Table />
      <Paginate />
    </div>
  );
};

export default HomePage;
