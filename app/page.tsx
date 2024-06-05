'use client';
import React, { useState, useEffect } from 'react';
import { Coin } from './components/interface';
import CoinTable from './components/CoinTable/CoinTable';
import Pagination from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar/SearchBar';
import style from './Home.module.scss';
import coinsData from '../data/coin.json';

const Home: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Coin; direction: 'ascending' | 'descending' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);

  useEffect(() => {
    setCoins(coinsData);
  }, []);

  const formatPrice = (value: number) => {
    const suffixes = ['b', 'm', 'k'];
    let formattedValue = value;
    let suffixIndex = 0;

    while (formattedValue >= 1000) {
      formattedValue /= 1000;
      suffixIndex++;
    }
    return formattedValue.toFixed(2) + (suffixes[suffixIndex] || '');
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredCoins].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Добавление проверки на наличие значений перед их сравнением
        if (aValue !== undefined && bValue !== undefined) {
          if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return filteredCoins;
  }, [filteredCoins, sortConfig]);

  const handleSort = (key: keyof Coin) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = sortedCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Today's Cryptocurrency Prices by Crypto Market</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CoinTable coins={currentCoins} formatPrice={formatPrice} handleSort={handleSort} />
      <Pagination totalCoins={filteredCoins.length} coinsPerPage={coinsPerPage} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};

export default Home;


