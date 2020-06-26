import React, { useState } from 'react';
import styles from './Toolbar.module.css'
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'

export function Toolbar (props) {
    console.log({children: props.children});
    return (
        <nav className={styles.nav}>
            <ExitIcon/>
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
            <div><ExitIcon/></div>
            <a href="#"  onClick={() => setOpen(!open)}>
                {props.icon}
           </a> 
           {open && props.children}
        </li>
    )
}