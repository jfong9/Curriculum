import React from 'react';
import styles from './SideDrawer.module.css'
const sideDrawer = props => {
    let drawerClass = styles.sideDrawer
    if (props.show) {
        drawerClass = `${styles.sideDrawer} ${styles.open}`;
    }
    return(
        <nav className={drawerClass}>
            <ul className={styles.ul}>
                {props.children} 
            </ul>
        </nav>
)};

export default sideDrawer;