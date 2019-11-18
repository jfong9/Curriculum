"use strict"

// import logo from 'assets/images/logo.svg';
import './MainPortal.css';
import SideBar from './SideBar'
import React from 'react'
import axios from 'axios'
import { Switch, Route } from 'react-router-dom'
import users from 'database/users'
import schools from 'database/schools'
import Students from 'components/Students'
import Curriculum from 'components/Curriculum'
import Categories from 'components/Categories'
import NavPanel from './NavPanel'

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
        console.log("MainPortal",this.props);
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
                <SideBar {...this.props}/>
                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route exact path='/:user/MainPortal' component={NavPanel}/>
                            <Route path='/:username/MainPortal/:schoolid/Students' component = {Students}/>
                            <Route path='/:username/MainPortal/:schoolid/Curriculum/:category' component = {Categories}/>
                            <Route path='/:username/MainPortal/:schoolid/Curriculum' component = {Curriculum}/>
                        </Switch>
                        
                    </header>
                </div>
                <div>{user.username}</div>
                {user.name}
                {schools.map((s) => <div key={s.schoolid}>{s.name}</div>)}
            </div>
        )
    }
}

export default MainPortal