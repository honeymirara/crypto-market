'use client'
import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import style from './style.module.scss';
import PortfolioModal from '../PortfolioModal/PortfolioModal';

const Header: FC = () => {
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [initialValue, setInitialValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeDifference, setChangeDifference] = useState(0);

    useEffect(() => {
        const storedPortfolio = JSON.parse(localStorage.getItem('cryptoPortfolio') || '[]');
        const value = storedPortfolio.reduce((acc: number, coin: any) => acc + coin.priceUSD * (coin.quantity || 0), 0);
        setPortfolioValue(value);
        setInitialValue(value);
    }, []);

    useEffect(() => {
        const difference = portfolioValue - initialValue;
        setChangeDifference(difference);
    }, [portfolioValue, initialValue]);

    const calculatePercentage = (value: number) => {
        if (initialValue === 0) {
            return 0;
        }
        return ((value / initialValue) * 100).toFixed(2);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={style.header}>
                <div className={style.dashboard}>
                    <div className={style.statistics}>
                        {/* Statistics about major cryptocurrencies */}
                    </div>
                    <div className={style.languageSwitcher}>
                        {/* Language switcher */}
                    </div>
                    <div className={style.authButtons}>
                        {/* Login/logout buttons */}
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.logo}>
                        <div className={style.logoImg}></div>
                        <h1>CryptoMarket</h1>
                    </div>
                    <nav className={style.nav}>
                        <Link href="/" className={style.link}>
                            Home
                        </Link>
                        <Link href="/about" className={style.link}>
                            About
                        </Link>
                        <Link href="/market" className={style.link}>
                            Market
                        </Link>
                        <Link href="/portfolio" className={style.link}>
                            Portfolio
                        </Link>
                        <Link href="/contact" className={style.link}>
                            Contact
                        </Link>
                    </nav>
                    <div className={style.portfolioValue} onClick={handleModalOpen}>
                        {portfolioValue.toFixed(2)} USD {changeDifference.toFixed(2)} ({calculatePercentage(portfolioValue)}%)
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <PortfolioModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    portfolioValue={portfolioValue}
                    initialValue={initialValue}
                />
            )}
        </>
    );
};

export default Header;






