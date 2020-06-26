import React from 'react'
import { Link } from 'react-router-dom'
import signupStyles from './Signup.module.css'
import SignUpFields from './SignupFields'
const LogInLinkButton = props => (
    <Link className={signupStyles.link} to='/' {...props} >
            Log In
    </Link>
);

function Signup( {history} ) {
    return (
        <div className={`${signupStyles.body} ${signupStyles.multiline}`}>
            <div className={signupStyles.slogan}>
                {`Get started managing your curriculum today!`}
            </div>
            <div className={signupStyles.signup}>
                <SignUpFields history={history}/>
                <div>
                    {`\nAlready a curriculum manager? `}
                    <LogInLinkButton/>
                </div> 
            </div>

        </div>
    )
}

export default Signup;