import {BrowserRouter} from 'react-router-dom'
import React from 'react';
import Header from './Header';
import Main from './Main'
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from 'utils/accounts'
function App() {

    //  unsure if I want to have a permanent header, most likely?
    return ( 
        <ApolloProvider client = {apolloClient}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Main/>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App;
