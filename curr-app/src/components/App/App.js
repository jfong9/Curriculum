import {BrowserRouter} from 'react-router-dom'
import React from 'react';
import Header from './Header';
import Main from './Main'

function App() {
    //  unsure if I want to have a permanent header, most likely?
    return ( 
        <BrowserRouter>
            <div>
                <Header />
                <Main/>
            </div>
        </BrowserRouter>
    )
}

export default App;
