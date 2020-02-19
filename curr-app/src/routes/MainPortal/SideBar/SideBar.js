"use strict"

import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as mainPortalActions from 'actions/mainPortalActions'
import users from 'database/users'

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        // console.log("sidebar constructor props", props)
        this.state = {
            user: {},
            schools: [],
            selectedSchool: {},
            // school: this.props.school,
        }
    }
    componentDidMount() {
        // console.log("Sidebar", this.props)
        const {match: {params}} = this.props;
        let user = this.GetUserInfoFromHTTPRequest(params.username);
        this.setState( {user})
        this.SetSchoolInfoFromHTTPRequest(user)
    }

    handleSchoolChange = (event) => {
        const { value } = event.target
        const { schools } = this.state;
        this.setSelectedSchool(schools[value]); 
    }
               
    setSelectedSchool(school) {
        this.setState({selectedSchool: school})
        this.props.handleStateChange(school);
    }

    GetUserInfoFromHTTPRequest(username) {
        //for now this is retrieve here internally, but should have this info once logging in.
        //this call would go away eventually, and maybe the users info passed to this main portal somehow through logging in.
        let user = users.find( (user) => user.username === username);
        return user;
    }

    SetSchoolInfoFromHTTPRequest(user) {
        // let usersSchoolNames = user.schools.map((i) => i.username);
        // let usersSchools = schools.filter((i) => usersSchoolNames.includes(i.username))
        // return usersSchools
        mainPortalActions.fetchSchools(user.schools.map(school => school.username))
            .then( (schools = []) => {
                // console.log("Schools:", schools)
                let selectedSchool = schools.length > 0 ? schools[0] : {};
                // console.log("SelectedSchool", selectedSchool)
                this.setState( { schools } );
                this.setSelectedSchool(selectedSchool);
            })
    }

    createSelectedItems() {
        const {schools} = this.state;
        let items = schools.map( (school, index) => <option key={index} value={index}>{school.name}</option>)
        return items;
    }

    render() {
        return (
            <div>
                <div> SideBar Here </div>
                <label>schoolid:</label>
                <select onChange={this.handleSchoolChange}>
                    {this.createSelectedItems()}
                </select>
                <Link to={`${this.props.match.url}`}>
                    <button>Home</button>
                </Link>
                <Link to={`${this.props.match.url}/Students`}>
                    <button>Students </button>
                </Link>
                <Link to={`${this.props.match.url}/Curriculum`}>
                    <button>Curriculum </button>
                </Link>
                <button disabled={true}>Attendance</button>
                <button disabled={true}>Classes </button>
            </div>
        )
    }
}

export default SideBar