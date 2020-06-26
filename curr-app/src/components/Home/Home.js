"use strict"

import React from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Login from 'components/Login'
import homeStyles from './Home.module.css'

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
    <Link className={homeStyles.link} to='/signup' {...props} >
            Sign up
    </Link>
);
function Home() {
    return (
        <div className={`${homeStyles.body} ${homeStyles.multiline}`}>
            <div className={homeStyles.logo}>
                {`Curriculum Manager`}
            </div>
            <div className={homeStyles.login}>
                <Login className={homeStyles.login}/>
                <div>
                    {`\nDon't have an account?`} <SignupButton />
                </div>
            </div>
            {/* <div className={homeStyles.login}>
                <Login />  */}
                {/* <LogInButton/>
                <SignupButton/> */}
                {/* <ul>
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
            </div> */}
        </div>   
    )
}
export default Home 