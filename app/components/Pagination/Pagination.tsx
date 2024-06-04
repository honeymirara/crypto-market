'use client'
import React from 'react';

interface Props {
  totalCoins: number;
  coinsPerPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ totalCoins, coinsPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} disabled={number === currentPage}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination

