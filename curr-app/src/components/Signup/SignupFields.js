import React, { useState } from 'react'
import { accountsGraphQL } from 'utils/accounts'
import FormError from 'components/FormError'
import signupStyles from './Signup.module.css'

export default function SignUpFields ({history}) {
    const [error, setError] = useState(null);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const handleCreate =  async (e) => {
        e.preventDefault();
        try {
            await accountsGraphQL.createUser({
                username: user.username,
                email: user.email,
                password: user.password
            })
            history.push('/login');
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <form className={signupStyles.signupBox} onSubmit={handleCreate}>
            <div >
                <label className={signupStyles.label}>
                    Userame
                    <input 
                        className={signupStyles.input}
                        type='text' 
                        name='username' 
                        value={user.username} 
                        onChange={(e) => {setUser({...user, username: e.target.value})}}
                    />
                </label>
            </div>
            <div >
                <label className={signupStyles.label}>
                    Email
                    <input 
                        className={signupStyles.input}
                        type='text' 
                        name='email' 
                        value={user.email} 
                        onChange={(e) => {setUser({...user, email: e.target.value})}}
                    />
                </label>
            </div>
            <div >
                <label className={signupStyles.label}>
                    Password
                    <input 
                        className={signupStyles.input}
                        type='text' 
                        name='password' 
                        value={user.password} 
                        onChange={(e) => {setUser({...user, password: e.target.value})}}
                    />
                </label>
            </div>
            {/* <div >
                <label className={signupStyles.label}>
                    User Type
                    <input 
                        className={signupStyles.input}
                        type='text' 
                        name='userType' 
                        // value={user.username} 
                        // onChange={(e) => {setUser({...user, username: e.target.value})}}
                    />
                </label>
            </div> */}
            <div >
                <input 
                    className={signupStyles.submitButton} 
                    type='submit' 
                    value='Create Account'/>
                {error && <FormError error={error}/> }
            </div>
        </form>
    )
}