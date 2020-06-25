"use strict"

import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import MainPortal from 'routes/MainPortal'
import Header from 'components/Header';
import SideDrawer from 'components/SideDrawer/SideDrawer';
import { useQuery } from '@apollo/react-hooks'
import Backdrop from '../../components/Backdrop/Backdrop'
import backdrop from '../../components/Backdrop/Backdrop'

const USER_QUERY = gql`
    query getUser {
        user: getUser {
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
function Main(props) {
    const { loading, error, data } = useQuery(USER_QUERY);
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    console.log("Main Props: ", props)
    if (!data.user) {
        return <Redirect to="/" />
    }

    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(!sideDrawerOpen)
    }
    const backdropClickHandler = () => {
        setSideDrawerOpen(false)
    }

    const renderDrawer = () => {
        if (sideDrawerOpen) {
            return <Backdrop click={backdropClickHandler} />
        }
    }
    return (
        <React.Fragment>
            <Header {...props} buttonClickHandler={drawerToggleClickHandler} />
            <SideDrawer show={sideDrawerOpen}/>
            {renderDrawer()}
            <main style={{marginTop:"60px"}}>
                <Switch>
                    <Route path='/MainPortal' render = {props =>
                            (<MainPortal {...props} user={data.user}/>)}
                    />
                    <Route render= {props => (<div>Snooping around2? How'd you get here</div>)}/>
                </Switch>
            </main>   
        </React.Fragment>
    )
    //will I need to provide the ID in the URL to keep track of who is editing? will also be needed for student notes/etc.
}

export default Main