'use client'
import React from 'react';
import { Coin } from '../interface';
import style from './style.module.scss';

interface CoinTableProps {
  coins: Coin[];
  formatPrice: (value: number) => string;
  handleAddCoin: (coin: Coin) => void;
  handleSort: (key: keyof Coin) => void;
}

const CoinTable: React.FC<CoinTableProps> = ({ coins, formatPrice, handleAddCoin, handleSort }) => {
  return (
    <table className={style.table}>
      <thead>
        <tr>
          <th onClick={() => handleSort('symbol')}>Symbol</th>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('priceUSD')}>Price (USD)</th>
          <th onClick={() => handleSort('marketCapUSD')}>Market Cap (USD)</th>
          <th onClick={() => handleSort('change24h')}>Change (24h)</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <tr key={coin.id}>
            <td>
              {coin.symbol}
              <img src={coin.logo} style={{ width: '20px', height: '20px', marginLeft: '5px' }}/>
            </td>
            <td>{coin.name}</td>
            <td>{formatPrice(coin.priceUSD)}</td>
            <td>{formatPrice(coin.marketCapUSD)}</td>
            <td>{coin.change24h}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
