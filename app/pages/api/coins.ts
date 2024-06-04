import type { NextApiRequest, NextApiResponse } from 'next';
import { Coin } from '../../components/interface';
import btcLogo from '../../../public/assets/btc.png'
import ethLogo from '../../../public/assets/eth.png'

const coins: Coin[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: '../../../public/assets/',
    priceUSD: 45000.0,
    marketCapUSD: 850000000.0,
    change24h: 5.25,
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '../../../public/assets/',
    priceUSD: 3000.0,
    marketCapUSD: 350000000.0,
    change24h: 3.75,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Coin[]>) {
  res.status(200).json(coins);
}
