"use strict"

import React from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const INFO_QUERY = gql`
        query getSensitiveInfo {
            rinfo: regularInformation
            # sinfo: sensitiveInformation
            # info: regularInfo
    }
    `

const LogInButton = props => (
    <Link to='/login' {...props} >
        <button>
            Log In
        </button>
    </Link>
);
const SignupButton = props => (
    <Link to='/signup' {...props} >
        <button>
            Sign up
        </button>
    </Link>
);
function Home() {
    return (
        <main>  
            <div>
                Splash page 
                <LogInButton/>
                <SignupButton/>
                <ul>
                    <Query query={INFO_QUERY}>
                        { ( {loading, error, data} ) => {
                                if (loading) return <div>Loading Home</div>
                                return [
                                error ? <div>Error Home {error.message}</div> : null,
                                data && data.sinfo ? <div>{data.sinfo}</div> : null,
                                data && data.rinfo ? <div>{data.rinfo}</div> : null,
                                ]
                            }
                        }
                    </Query>
                </ul>
            </div>
        </main>   
    )
}
export default Home 