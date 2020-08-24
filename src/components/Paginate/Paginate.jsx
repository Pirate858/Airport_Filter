import React, { useContext } from 'react';
import './Paginate.scss';
import { LeftArrowAlt, RightArrowAlt } from '@styled-icons/boxicons-regular';
import { FilterContext } from '../../context/FilterContext';

const Paginate = () => {
  const { onLeftPaginate, onRightPaginate, state } = useContext(FilterContext);

  return (
    <div className="paginate-container">
      <button disabled={state.currentPage <= 1 ? true : false} className="btn-container">
        <LeftArrowAlt size={28} onClick={(e) => (state.currentPage <= 1 ? e.preventDefault() : onLeftPaginate())} />
      </button>
      <span>
        {' '}
        Showing {state.currentPage * state.postPerPage - state.postPerPage || 1}-{state.currentPage * state.postPerPage}{' '}
        of {state.totalContent} results{' '}
      </span>
      <button disabled={state.isLastPage ? true : false} className="btn-container">
        <RightArrowAlt size={28} onClick={(e) => (state.isLastPage ? e.preventDefault() : onRightPaginate())} />
      </button>
    </div>
  );
};

export default Paginate;
