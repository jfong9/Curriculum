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
import StudentAdd from 'components/Students/StudentAdd'
import StudentEdit from 'components/Students/StudentEdit'

class MainPortal extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { 
            user: {},
            schools: [],
            selectedSchool: ''
        }
    }
    componentDidMount() {
        const {match: {params}} = this.props;
        console.log("MainPortal",this.props);
        let user = this.GetUserInfoFromHTTPRequest(params.username);
        let schools = this.GetSchoolInfoFromHTTPRequest(user);
        let selectedSchool = schools.length > 0 ? schools[0].schoolid : '';
        this.setState( {user, schools, selectedSchool} );

        // axios.get(`/${params.username}/MainPortal`)
        //     .then( (resp) => {
        //       console.log("data:", resp.data);
        //       return resp.data;  
        //     })
    }

    handleStateChange = ( schoolid ) => {
        this.setState( {selectedSchool: schoolid})
        console.log( 'MainPortal StateChange', schoolid)
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
        const {user, schools, selectedSchool} = this.state
        return (

            <div>
                <SideBar {...this.props} handleStateChange = {this.handleStateChange} />
                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route exact path='/:user/MainPortal' component={NavPanel}/>
                            <Route exact path='/:username/MainPortal/Students' render = {props =>
                                (<Students {...props} schoolid={selectedSchool}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/add' render={props =>
                                (<StudentAdd {...props} schoolid={selectedSchool}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/edit' render={props =>
                                (<StudentEdit {...props} schoolid={selectedSchool}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum/:category' render = {props =>
                                (<Categories {...props} schoolid={selectedSchool}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum' render={props => 
                                (<Curriculum {...props} schoolid={selectedSchool}/>)}
                            />
                            <Route render= {props => (<div>Snooping around? How'd you get here</div>)}/>
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