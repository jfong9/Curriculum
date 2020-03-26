"use strict"

// import logo from 'assets/images/logo.svg';
import './MainPortal.css';
import SideBar from './SideBar'
import React, { useState, useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import Students from 'components/Students'
import Curriculum from 'components/Curriculum'
import Categories from 'components/Categories'
import NavPanel from './NavPanel'
import StudentAdd from 'components/Students/StudentAdd'
import StudentEdit from 'components/Students/StudentEdit'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { accountsClient, apolloClient, accountsGraphQL } from 'utils/accounts';
import { getStudentsUrl } from '../../utils/redirectstrings';

const ME_QUERY = gql`
    query me {
        me {
            id
            username
            emails {
                address
                verified
            }
            schools {
                username
                type
            }
        }
    }
`


function MainPortal(props) {
    const history = useHistory();
    const [user, setUser] = useState(null)
    const { loading, error, data } = useQuery(ME_QUERY);

    const [selectedSchool, setSelected] = useState({});
    const [loggingOut, setLogout] = useState(false)
    const handleStateChange = (school) => {
        setSelected(school)
    }
    const onLogout = async () => {
        await accountsClient.logout();
        apolloClient.resetStore();
        // setLogout(true);
        // return <Redirect to="/login" />
        history.push('/login');
    }
   
    // useEffect(() => {
    //     if (!user) {
    //         getUser();
    //     }
    // }, [])

    // const getUser =  async() => {
    //     const retUser = await accountsClient.getUser();
    //     console.log("retUser", retUser);
    //     setUser(retUser);
    // }
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    if (!data.me) {
        return <Redirect to="/login" />
    }
    else { console.log(data.me)}
    
    return (
        <div>
            {loggingOut && <Redirect to='/login'/>}
            <button onClick={onLogout}>Logout</button>
            <SideBar {...props} user={data.me} handleStateChange = {handleStateChange} />
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
                        You are logged in as {data.me.username}
                    </div>
                </header>
            </div>
        </div>
    )
}
/*
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
                                (<Students {...props} schoolid={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/add' render={props =>
                                (<StudentAdd {...props} schoolid={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Students/edit' render={props =>
                                (<StudentEdit {...props} schoolid={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum/:category' render = {props =>
                                (<Categories {...props} schoolid={selectedSchool.username}/>)}
                            />
                            <Route exact path='/:username/MainPortal/Curriculum' render={props => 
                                (<Curriculum {...props} schoolid={selectedSchool.username}/>)}
                            />
                            <Route render= {props => (<div>Snooping around? How'd you get here</div>)}/>
                        </Switch>
                    </header>
                </div>
            </div>
        )
    }
}
*/
export default MainPortal