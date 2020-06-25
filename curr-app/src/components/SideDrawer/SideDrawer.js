import React from 'react';
import styles from './drawer.module.css'
const sideDrawer = props => {
    let drawerClass = styles.sideDrawer
    if (props.show) {
        drawerClass = `${styles.sideDrawer} ${styles.open}`;
    }
    return(
        <nav className={drawerClass}>
            <ul className={styles.ul}>
                <li className={styles.li}><a className={styles.a} href="/">Test</a></li>
            </ul>
        </nav>
)};

export default sideDrawer;