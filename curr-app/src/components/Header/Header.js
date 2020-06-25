"use strict"

import React from 'react'
import Logout from 'components/Logout'
import headerStyle from './Header.module.css'
import Toolbar from 'components/Toolbar'
import { HashRouter } from 'react-router-dom'
import SideDrawer from 'components/SideDrawer/SideDrawer';

function Header(props) {
    return ( 
        <header className={headerStyle.header}>
            <Toolbar buttonClickHandler={props.buttonClickHandler}/>
        </header>
    )
}

export default Header