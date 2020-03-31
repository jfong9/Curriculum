"use strict"

// import logo from 'assets/images/logo.svg';
import './MainPortal.css';
import SideBar from './SideBar'
import React, { useState} from 'react'
import { Switch, Route} from 'react-router-dom'
import Students from 'components/Students'
import Curriculum from 'components/Curriculum'
import Categories from 'components/Categories'
import NavPanel from './NavPanel'
import StudentAdd from 'components/Students/StudentAdd'
import StudentEdit from 'components/Students/StudentEdit'


function MainPortal(props) {

    const [selectedSchool, setSelected] = useState({});
    const handleStateChange = (school) => {
        setSelected(school)
    }
    
    return (
        <div>
            <SideBar {...props} handleStateChange = {handleStateChange} />
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route exact path='/MainPortal' component={NavPanel}/>
                        <Route exact path='/MainPortal/Students' render = {props =>
                            (<Students {...props} schoolid={selectedSchool.username}/>)}
                        />
                        <Route exact path='/MainPortal/Students/add' render={props =>
                            (<StudentAdd {...props} schoolid={selectedSchool.username}/>)}
                        />
                        <Route exact path='/MainPortal/Students/edit' render={props =>
                            (<StudentEdit {...props} schoolid={selectedSchool.username}/>)}
                        />
                        <Route exact path='/MainPortal/Curriculum/:category' render = {props =>
                            (<Categories {...props} schoolid={selectedSchool.username}/>)}
                        />
                        <Route exact path='/MainPortal/Curriculum' render={props => 
                            (<Curriculum {...props} schoolid={selectedSchool.username}/>)}
                        />
                        <Route render= {props => (<div>Snooping around? How'd you get here</div>)}/>
                    </Switch>
                    <div>
                        You are logged in as {props.user.username}
                    </div>
                </header>
            </div>
        </div>
    )
}

export default MainPortal