import React from 'react'
import styles from './Backdrop.module.css'

const backdrop = props => (
    <div className={styles.backdrop} onClick={props.click}/>
);

export default backdrop;