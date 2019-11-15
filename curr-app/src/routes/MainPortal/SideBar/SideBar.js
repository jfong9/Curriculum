"use strict"

import React from 'react'
import { Link, Route } from 'react-router-dom'
import Students from '../../../components/Students'

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            schoolid: 'YMA'
        }
    }
    componentDidMount() {
        console.log("Sidebar", this.props)
    }
    handleChange = (event) => {
        const {value} = event.target
        this.setState({
            schoolid: value
        })
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
                <Link to={`${this.props.match.url}/${this.state.schoolid}/Students`}>
                    <button>Students </button>
                </Link>
                <Link to={`${this.props.match.url}/${this.state.schoolid}/Curriculum`}>
                    <button>Curriculum </button>
                </Link>
                <button disabled={true}>Classes </button>
            </div>
        )
    }
}

export default SideBar