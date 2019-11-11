"use strict"

// import logo from '../../assets/images/logo.svg';
import './MainPortal.css';
import SideBar from './SideBar'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import users from '../../database/users'
import schools from '../../database/schools'

class MainPortal extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            schools: []
        }
    }
    componentDidMount() {
        const {match: {params}} = this.props;

        let user = this.GetUserInfoFromHTTPRequest(params.username);
        let schools = this.GetSchoolInfoFromHTTPRequest(user);
        this.setState( {user, schools} );

        // axios.get(`/${params.username}/MainPortal`)
        //     .then( (resp) => {
        //       console.log("data:", resp.data);
        //       return resp.data;  
        //     })
    }

    GetSchoolInfoFromHTTPRequest(user) {
        let usersSchoolNames = user.schools.map((i) => i.schoolid);
        let usersSchools = schools.filter((i) => usersSchoolNames.includes(i.schoolid))
        return usersSchools
    }
    GetUserInfoFromHTTPRequest(username) {
        let user = users.find( (user) => user.username === username);
        return user;
    }

    render() {
        const {user, schools} = this.state
        return (
            <div>
                <SideBar/>
                <div className="App">
                    <header className="App-header">
                        {/* <img src={logo} className="App-logo" alt="logo" /> */}
                        <div>{user.username}</div>
                        {user.name}
                        {schools.map((s) => <div key={s.schoolid}>{s.name}</div>)}
                    </header>
                </div>
            </div>
        )
    }
}

export default MainPortal