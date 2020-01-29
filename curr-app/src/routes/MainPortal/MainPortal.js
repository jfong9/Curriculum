"use strict"

// import logo from 'assets/images/logo.svg';
import './MainPortal.css';
import SideBar from './SideBar'
import React from 'react'
import { Switch, Route } from 'react-router-dom'
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
            selectedSchool: {},
        }
    }
    componentDidMount() {
        

        // axios.get(`/${params.username}/MainPortal`)
        //     .then( (resp) => {
        //       console.log("data:", resp.data);
        //       return resp.data;  
        //     })
    }

    handleStateChange = ( school ) => {
        this.setState( {selectedSchool: school })
        console.log( 'MainPortal StateChange', school)
    }

    render() {
        const {selectedSchool} = this.state
        console.log(selectedSchool)
        return (

            <div>
                <SideBar {...this.props} handleStateChange = {this.handleStateChange} />
                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route exact path='/:user/MainPortal' component={NavPanel}/>
                            <Route exact path='/:username/MainPortal/Students' render = {props =>
                                (<Students {...props} schoolun={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/add' render={props =>
                                (<StudentAdd {...props} schoolun={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/edit' render={props =>
                                (<StudentEdit {...props} schoolun={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum/:category' render = {props =>
                                (<Categories {...props} schoolun={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum' render={props => 
                                (<Curriculum {...props} schoolun={selectedSchool.username}/>)}
                            />
                            <Route render= {props => (<div>Snooping around? How'd you get here</div>)}/>
                        </Switch>
                    </header>
                </div>
            </div>
        )
    }
}

export default MainPortal