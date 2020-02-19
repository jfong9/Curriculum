"use strict"

import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
    // idea here is that user would log in, which would then go to the /:schoolid/MainPortal link
    // if log in is successful
    state = {
        username: 'jfong'
    } 
    
    handleChange = (event) => {
        const {value} = event.target
        this.setState({
            username: value
        })
    }
    render() {
        const {username} = this.state
        // console.log("Home", this.props);
        return (
            <div>
                <div className="Home">
                    <header className="Home-header">
                        Log In Page?
                        <div>
                            <label>username:</label>
                            <select value={username} onChange={this.handleChange}>
                                <option value='jfong'>Jason Fong</option>
                                <option value="rySayoc">Raymond Young</option>
                                <option value="plYMA">Philip Ly</option>
                                <option value="jfSayoc">Jason Sayoc Only</option>
                                <option value="jfBMMA">Jason BMMA</option>
                            </select>
                            <Link to={`/${username}/MainPortal`}>
                                <button>
                                    Login
                                </button>
                            </Link>
                        </div>
                        
                    </header>
                </div>
            </div>
        )
    }
}

export default Home 