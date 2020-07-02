"use strict"

// import logo from 'assets/images/logo.svg';
import styles from './MainPortal.module.css';
import React, { useState} from 'react'
import { Switch, Route} from 'react-router-dom'
import NavBar from 'components/NavBar'
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
        console.log("mainportal schoolchange")
        setSelected(school)
        if (school && school.arts && school.arts.length > 0) {
            setDefaultArt(school.arts[0]);
        }
        else setDefaultArt('')
    }
    
    const commonProps = {
        schoolId: selectedSchool._id,
        schoolun: selectedSchool.username,
        arts: selectedSchool.arts, 
        defaultArt: defaultArt,
        setDefaultArt: setDefaultArt
    }

    return (
        <React.Fragment>
            <NavBar {...props} handleSchoolChange = {handleSchoolChange} />
            
            <div className={styles.mainPortal} >
                <Switch>
                    <Route exact path='/MainPortal' render = {props => 
                        (<NavPanel {...props} {...commonProps} />)}
                    />
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
            </div>
{/* 
            <div>
                You are logged in as {props.user.username}
            </div> */}
        </React.Fragment>
    )
}

export default MainPortal