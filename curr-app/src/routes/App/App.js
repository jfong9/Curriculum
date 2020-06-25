import {BrowserRouter, Switch, Route} from 'react-router-dom'
import React from 'react';
import Main from 'routes/Main'
import Home from 'components/Home'
import Signup from 'components/Signup'
import Login from 'components/Login'
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from 'utils/accounts'
function App() {

    //  unsure if I want to have a permanent header, most likely?
    return ( 
        <ApolloProvider client = {apolloClient}>
            <BrowserRouter>
                <div style={{height:'100%'}}>
                    <Switch>
                        <Route exact path = '/' component={Home}/>
                        <Route path='/signup' component={Signup}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/MainPortal' component={Main}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
