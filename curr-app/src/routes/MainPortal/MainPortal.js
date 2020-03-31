"use strict"

// import logo from 'assets/images/logo.svg';
import './MainPortal.css';
import React, { useState} from 'react'
import { Switch, Route} from 'react-router-dom'
import SideBar from 'components/Sidebar'
import Students from 'components/Students'
import Curriculum from 'components/Curriculum'
import Categories from 'components/Categories'
import NavPanel from 'components/NavPanel'
import StudentAdd from 'components/Students/StudentAdd'
import StudentEdit from 'components/Students/StudentEdit'


function MainPortal(props) {
    const [selectedSchool, setSelected] = useState({});
    const [defaultArt, setDefaultArt] = useState('');
    const handleSchoolChange = (school) => {
        setSelected(school)
        if (school.arts.length > 0) setDefaultArt(school.arts[0]);
        else setDefaultArt('')
    }
    
    const handleArtChange = (art) => {
        setDefaultArt(art);
    }

    const commonProps = {
        schoolid: selectedSchool.username,
        school: selectedSchool,
        defaultArt: defaultArt,
        handleArtChange: handleArtChange
    }

    return (
        <div>
            <SideBar {...props} handleSchoolChange = {handleSchoolChange} />
            <div className="App">
                <header className="App-header">
                    <Switch>
                        <Route exact path='/MainPortal' component={NavPanel}/>
                        <Route exact path='/MainPortal/Students' render = {props =>
                            (<Students {...props} {...commonProps} />)}
                        />
                        <Route exact path='/MainPortal/Students/add' render={props =>
                            (<StudentAdd {...props} {...commonProps}/>)}
                        />
                        <Route exact path='/MainPortal/Students/edit' render={props =>
                            (<StudentEdit {...props} {...commonProps}/>)}
                        />
                        <Route exact path='/MainPortal/Curriculum/:category' render = {props =>
                            (<Categories {...props} {...commonProps}/>)}
                        />
                        <Route exact path='/MainPortal/Curriculum' render={props => 
                            (<Curriculum {...props} {...commonProps}/>)}
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