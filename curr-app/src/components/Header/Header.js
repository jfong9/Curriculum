"use strict"

import React from 'react'
import Logout from 'components/Logout'
import styles from './Header.module.css'
import { Toolbar, ToolbarItem } from 'components/Toolbar/Toolbar'
import { Link } from 'react-router-dom'
import MenuToggleButton  from './MenuToggleButton'
import { DropdownMenu, DropdownItem } from 'components/DropdownMenu/DropdownMenu'
// import { ReactComponent as ExitIcon} from 'assets/icons/exit.svg';

function Header(props) {
    return ( 
        <header className={styles.header}>
            <div>
                <nav className={styles.navigation}>
                    <div> 
                        <Link className={styles.logo} to={`${props.match.url}`}>
                            <label className={styles.logo}>CM</label>
                        </Link>
                    </div>
                </nav>
            </div>
            <div className={styles.spacer}/>
            <div className={styles.toolbar}>
                <Toolbar {...props} >
                    <ToolbarItem className={styles.toolbarItem} icon={<MenuToggleButton/>}>
                        <DropdownMenu>
                            <DropdownItem><Logout className={styles.logout}/></DropdownItem>
                        </DropdownMenu>
                    </ToolbarItem>
                    <ToolbarItem className={styles.toolbarItem}>
                        <DropdownMenu>
                            <DropdownItem><Logout className={styles.logout}/></DropdownItem>
                        </DropdownMenu>
                    </ToolbarItem>
                </Toolbar>
            </div>
        </header>
    )
}

export default Header