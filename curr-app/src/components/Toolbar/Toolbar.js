import React from 'react';
import styles from './Toolbar.module.css'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

export default function Toolbar (props) {
    return (
        <header className={styles.toolbar}>
            <nav className={styles.navigation}>
                <div className={styles.toolbarButton}>
                    <DrawerToggleButton click={props.buttonClickHandler}/>
                </div>
                <div><a className={styles.logo}href="/MainPortal">CM</a></div>
                <div className={styles.spacer}/>
                <div className={styles.navItems}>
                    <ul className={styles.ul}>
                        <li className={styles.li}><a className={styles.navA} href="/Curriculum">Curriculum</a></li>
                        <li className={styles.li}><a className={styles.navA} href="/">Logout</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}