"use strict"

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from 'routes/Home'
import Signup from 'components/Signup'
import Login from 'components/Login'
import MainPortal from 'routes/MainPortal'

function Main() {
    return (
        <main>
            <Switch>
                <Route exact path = '/' component={Home}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/login' component={Login}/>
                <Route path='/MainPortal' component={MainPortal}/>
                <Route render= {props => (<div>Snooping around2? How'd you get here</div>)}/>
            </Switch>
        </main>   
    )
    //will I need to provide the ID in the URL to keep track of who is editing? will also be needed for student notes/etc.
}

export default Main