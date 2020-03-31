"use strict"

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import gql from 'graphql-tag'
import MainPortal from 'routes/MainPortal'
import Header from 'components/App/Header';
import { useQuery } from '@apollo/react-hooks'

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
function Main() {
    const { loading, error, data } = useQuery(USER_QUERY);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    if (!data.user) {
        return <Redirect to="/login" />
    }

    return (
        <main>
            <Header />
            <Switch>
                <Route path='/MainPortal' render = {props =>
                        (<MainPortal {...props} user={data.user}/>)}
                />
                <Route render= {props => (<div>Snooping around2? How'd you get here</div>)}/>
            </Switch>
        </main>   
    )
    //will I need to provide the ID in the URL to keep track of who is editing? will also be needed for student notes/etc.
}

export default Main