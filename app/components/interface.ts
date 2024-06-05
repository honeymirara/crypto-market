

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    logo: string;
    priceUSD: number;
    marketCapUSD: number;
    change24h: number;
    quantity?: number;
  }