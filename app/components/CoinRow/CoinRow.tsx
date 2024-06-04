'use client'
import React from 'react';
import { Coin } from '../interface';

interface Props {
  coin: Coin;
  formatPrice: (value: number) => string;
  handleAddCoin: (coin: Coin) => void;
}

const CoinRow: React.FC<Props> = ({ coin, formatPrice, handleAddCoin }) => {
  return (
    <tr>
      <td>{coin.symbol}</td>
      <td><img src={coin.logo} alt={coin.symbol} width="20" height="20" /></td>
      <td>{formatPrice(coin.priceUSD)}</td>
      <td>{formatPrice(coin.marketCapUSD)}</td>
      <td>{coin.change24h}%</td>
      <td><button onClick={() => handleAddCoin(coin)}>Добавить</button></td>
    </tr>
  );
};

export default CoinRow;
