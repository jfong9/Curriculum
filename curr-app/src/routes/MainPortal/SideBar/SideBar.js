"use strict"

import React from 'react'
import { Link, Route } from 'react-router-dom'
import Students from 'components/Students'

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        console.log("sidebar constructor props", props)
        this.state = {
            schoolid: 'YMA',
            schools: []
        }
    }
    componentDidMount() {
        console.log("Sidebar", this.props)
    }
    handleChange = (event) => {
        const {value} = event.target
        this.props.handleStateChange(value); 
        this.setState( {schoolid: value})
    }
    render() {
        const { schoolid } = this.state;
        return (
            <div>
                <div> SideBar Here </div>
                <label>schoolid:</label>
                <select value={schoolid} onChange={this.handleChange}>
                    <option value='YMA'>Yee's Martial Arts</option>
                    <option value="SayocNorCal">Sayoc Nor Cal</option>
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