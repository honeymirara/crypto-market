'use client';
import React from 'react';
import style from './style.module.scss';

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Поиск..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={style.searchInput}
    />
  );
};

export default SearchBar;

