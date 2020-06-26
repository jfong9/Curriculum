import React from 'react';
import styles from './MenuToggleButton.module.css'

const MenuToggleButton = props => (
    <button className={styles.toggleButton} onClick={props.click}>
        <div className={styles.buttonLine}/>
        <div className={styles.buttonLine}/>
        <div className={styles.buttonLine}/>
    </button>
)

export default MenuToggleButton;