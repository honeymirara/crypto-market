/* 'use client'
import React from 'react';
import { Coin } from '../interface';
import style from './style.module.scss';
import Image from 'next/image';

interface CoinTableProps {
  coins: Coin[];
  formatPrice: (value: number) => string;
  handleAddCoin: (coin: Coin) => void;
  handleSort: (key: keyof Coin) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, formatPrice, handleAddCoin, handleSort }) => {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('symbol')}>Symbol</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('priceUSD')}>Price (USD)</th>
            <th onClick={() => handleSort('marketCapUSD')}>Market Cap (USD)</th>
            <th onClick={() => handleSort('change24h')}>Change (24h)</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className={style.coinSymbol}>
                {coin.symbol}
                <Image alt="coin-logo" src={coin.logo} width={20} height={20} className={style.coinLogo} />
              </td>
              <td>{coin.name}</td>
              <td>{formatPrice(coin.priceUSD)}</td>
              <td>{formatPrice(coin.marketCapUSD)}</td>
              <td>{coin.change24h}%</td>
              <td>
                <button
                  className={style.addButton}>
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable; */

'use client'
import React, { useState } from 'react';
import { Coin } from '../interface';
import style from './style.module.scss';
import Image from 'next/image';
import Modal from '../Modal/Modal';

interface CoinTableProps {
  coins: Coin[];
  formatPrice: (value: number) => string;
  handleSort: (key: keyof Coin) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, formatPrice, handleSort }) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleAddCoin = (coin: Coin) => {
    setSelectedCoin(coin);
  };

  const handleConfirmAdd = (quantity: number) => {
    if (selectedCoin) {
      const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
      const existingCoin = portfolio.find((c: Coin) => c.id === selectedCoin.id);
      
      if (existingCoin) {
        existingCoin.quantity += quantity;
      } else {
        portfolio.push({ ...selectedCoin, quantity });
      }

      localStorage.setItem('portfolio', JSON.stringify(portfolio));
      setSelectedCoin(null);
    }
  };

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort('symbol')}>Symbol</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('priceUSD')}>Price (USD)</th>
            <th onClick={() => handleSort('marketCapUSD')}>Market Cap (USD)</th>
            <th onClick={() => handleSort('change24h')}>Change (24h)</th>
            <th>Add</th> {/* Новый столбец для кнопки Add */}
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td className={style.coinSymbol}>
                {coin.symbol}
                <Image alt="coin-logo" src={coin.logo} width={20} height={20} className={style.coinLogo} />
              </td>
              <td>{coin.name}</td>
              <td>{formatPrice(coin.priceUSD)}</td>
              <td>{formatPrice(coin.marketCapUSD)}</td>
              <td>{coin.change24h}%</td>
              <td>
                <button
                  className={style.addButton}
                  onClick={() => handleAddCoin(coin)}
                >
                  Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCoin && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCoin(null)}
          onConfirm={handleConfirmAdd}
          coinName={selectedCoin.name}
        />
      )}
    </div>
  );
};

export default CoinTable;

