"use strict"

import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import * as sidebarActions from 'actions/sidebarActions'
import styles from './NavBar.module.css'
import SideDrawer from 'components/SideDrawer/SideDrawer'
import Backdrop from 'components/Backdrop/Backdrop'

class NavBar extends React.Component{
    constructor(props) {
        super(props);
        // console.log("NavBar constructor props", props)
        this.state = {
            // user: {},
            schools: [],
            selectedSchool: {},
            open: false,
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
               
    moreClickHandler = (event) => {
        const { open } = this.state;
        this.setState({open: !open})
    }

    backdropClickHandler = () => {
        this.setState({open: false})
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
    
    renderBackdrop = () => {
        const { open } = this.state;
        if (open) {
            return <Backdrop click={this.backdropClickHandler} />
        }
    }

    navLinks = () => {
        const { selectedSchool } = this.state
        return  (
        <React.Fragment>
            {/* <Link className={styles.link} to={`${this.props.match.url}`}>
                Home
            </Link> */}
            <Link className={styles.link} to={{pathname:`${this.props.match.url}/Students`,
                    state: {
                        schoolun: selectedSchool.username
                    }}}>
                Students
            </Link>
            <Link className={styles.link} to={`${this.props.match.url}/Curriculum`}>
                Curriculum 
            </Link>
            <div className={styles.disabledLink} disabled={true}>Attendance</div>
            <div className={styles.disabledLink} disabled={true}>Classes </div>
        </React.Fragment>
    ) }
    render() {
        const { open } = this.state
        return (
            <div className={styles.navbar}>
                <SideDrawer show={open}>
                    {this.navLinks()}
                </SideDrawer>
                {this.renderBackdrop()}
                <div className={styles.moreButton} onClick={this.moreClickHandler}/>
                <div >
                    <select className={styles.schoolDropdown} onChange={this.handleSchoolChange}>
                        {this.createSelectedItems()}
                    </select>
                </div>
                <div className={styles.links}>
                    {this.navLinks()}
                </div>
            </div>
        )
    }
}

export default NavBar