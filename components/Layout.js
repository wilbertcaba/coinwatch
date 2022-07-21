import React from 'react'
import Navbar from './Navbar';
import styles from '../styles/Home.module.css';

const Layout = ({children}) => {
  return (
    <div>
        <Navbar />
        <div className={styles.container}> {children} </div>
    </div>
  )
}

export default Layout;