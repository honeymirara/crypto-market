'use client';
import React, { useState, useEffect } from 'react';
import style from './style.module.scss';
import { Coin } from '../interface';

interface PortfolioModalProps {
    isOpen: boolean;
    onClose: () => void;
    portfolioValue: number;
    initialValue: number;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, portfolioValue, initialValue }) => {
    const [portfolio, setPortfolio] = useState<Coin[]>([]);

    useEffect(() => {
        const storedPortfolio = JSON.parse(localStorage.getItem('cryptoPortfolio') || '[]');
        setPortfolio(storedPortfolio);
    }, []);

    const handleRemoveCoin = (id: string) => {
        const updatedPortfolio = portfolio.filter(coin => coin.id !== id);
        setPortfolio(updatedPortfolio);
        localStorage.setItem('cryptoPortfolio', JSON.stringify(updatedPortfolio));
    };

    if (!isOpen) {
        return null;
    }

    const changePercentage = initialValue !== 0 ? (((portfolioValue - initialValue) / initialValue) * 100).toFixed(2) : 0;

    return (
        <div className={style.modalBackground}>
            <div className={style.modalContent}>
                <button className={style.closeButton} onClick={onClose}>×</button>
                <h2 className={style.title}>Your Portfolio</h2>
                <ul className={style.portfolioList}>
                    {portfolio.map((coin) => (
                        <li key={coin.id} className={style.portfolioItem}>
                            <span>{coin.name}</span>
                            <span>{coin.quantity} x {coin.priceUSD.toFixed(2)} USD</span>
                            <span>{(coin.quantity! * coin.priceUSD).toFixed(2)} USD</span>
                            <button className={style.removeButton} onClick={() => handleRemoveCoin(coin.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
                <div className={style.portfolioSummary}>
                    Total Value: {portfolioValue.toFixed(2)} USD
                    <br />
                    Initial Value: {initialValue.toFixed(2)} USD
                    <br />
                    Change: {(portfolioValue - initialValue).toFixed(2)} USD ({changePercentage}%)
                </div>
            </div>
        </div>
    );
};

export default PortfolioModal;

