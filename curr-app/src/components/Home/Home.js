"use strict"

import React from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const INFO_QUERY = gql`
        query getSensitiveInfo {
            info: sensitiveInformation
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
                <Query query={INFO_QUERY}>
                    { ( {loading, error, data} ) => {
                            if (loading) return <div>Loading Home</div>
                            if (error) return <div>Error Home {error.message}</div>
                            if (data.info) return <div>{data.info}</div>
                            return null
                        }
                    }
                </Query>
            </div>
        </main>   
    )
}
export default Home 