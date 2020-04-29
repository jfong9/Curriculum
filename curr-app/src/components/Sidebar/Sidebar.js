"use strict"

import React, { useReducer } from 'react'
import { Link, Route } from 'react-router-dom'
import * as sidebarActions from 'actions/sidebarActions'

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        // console.log("sidebar constructor props", props)
        this.state = {
            // user: {},
            schools: [],
            selectedSchool: {},
            // school: this.props.school,
        }
    }
    componentDidMount() {
        const { user } = this.props
        this.SetSchoolInfoFromHTTPRequest(user)
    }

    handleSchoolChange = (event) => {
        const { value } = event.target
        const { schools } = this.state;
        this.setSelectedSchool(schools[value]); 
    }
               
    setSelectedSchool(school) {
        this.setState({selectedSchool: school})
        this.props.handleSchoolChange(school);
    }

    SetSchoolInfoFromHTTPRequest(user) {
        if (!user.schools) {
            user.schools = []
        }
        sidebarActions.fetchSchools(user.schools.map(school => school.username))
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
        const { selectedSchool} = this.state
        return (
            <div>
                <div> Sidebar Here </div>
                <label>schoolid:</label>
                <select onChange={this.handleSchoolChange}>
                    {this.createSelectedItems()}
                </select>
                <Link to={`${this.props.match.url}`}>
                    <button>Home</button>
                </Link>
                <Link to={{pathname:`${this.props.match.url}/Students`,
                           state: {
                               schoolun: selectedSchool.username
                           }}}>
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

export default Sidebar