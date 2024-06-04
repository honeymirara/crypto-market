'use client'
import { usePathname } from 'next/navigation';
import React, { FC } from 'react';
import Link from 'next/link';
import style from './style.module.scss';

const Header: FC = () => {

    /* const toggleTheme = () => {
        if (document.body) {
            document.body.classList.toggle('dark-theme');
        }
    }; */

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
                    <div className={style.themeToggle}>
                       {/*  <button onClick={toggleTheme}>Toggle Theme</button> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;



