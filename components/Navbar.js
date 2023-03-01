import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';


const Navbar = () => {
  return (
    <nav>
        <div className={styles.navbar}>
            <Link href='/coins'>Coins</Link>
            <Link href='/watchlist'>Watchlist</Link>
            <Link href='/profile/username'>Profile</Link>
        </div>
    </nav>
  )
}

export default Navbar