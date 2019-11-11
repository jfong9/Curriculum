"use strict"

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../../../routes/Home'
import MainPortal from '../../../routes/MainPortal'

function Main() {
    return (
        <main>
            <Switch>
                <Route exact path = '/' component={Home}/>
                <Route path='/:username/MainPortal' component={MainPortal}/>
            </Switch>
        </main>   
    )
    //will I need to provide the ID in the URL to keep track of who is editing? will also be needed for student notes/etc.
}

export default Main