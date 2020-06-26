import React, { useState } from 'react';
import styles from './Toolbar.module.css'

export function Toolbar (props) {
    console.log({children: props.children});
    return (
        <nav className={styles.nav}>
            <ul className={styles.itemList}>
                {props.children}
            </ul>
        </nav>
    )
}

export function ToolbarItem (props) {
    const [open, setOpen] = useState(false);
    console.log("Item Created",open);
    return (
        <li className={styles.item}>
            <a className={styles.iconButton} href="#"  onClick={() => setOpen(!open)}>
                {props.icon}
           </a> 
           {open && props.children}
        </li>
    )
}