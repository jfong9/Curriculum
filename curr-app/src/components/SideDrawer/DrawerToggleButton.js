import React from 'react';
import styles from './drawer.module.css'

const DrawerToggleButton = props => (
    <button className={styles.toggleButton} onClick={props.click}>
        <div className={styles.buttonLine}/>
        <div className={styles.buttonLine}/>
        <div className={styles.buttonLine}/>
    </button>
)

export default DrawerToggleButton;