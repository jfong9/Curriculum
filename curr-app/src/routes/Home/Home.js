"use strict"

import React from 'react'
import {Link, Switch, Route, BrowserRouter} from 'react-router-dom'
import MainPortal from '../MainPortal'

class Home extends React.Component {
    // idea here is that user would log in, which would then go to the /:schoolid/MainPortal link
    // if log in is successful 
    render() {
        return (
            <div>
                <div className="Home">
                    <header className="Home-header">
                        Log In Page?
                        <ul>
                        <li><Link to='/jfong/MainPortal'>Link for YMA Login</Link></li>
                        <li><Link to='/rySayoc/MainPortal'>Link for Sayoc Login </Link></li>
                        </ul>
                    </header>
                </div>
            </div>
        )
    }
}

export default Home 