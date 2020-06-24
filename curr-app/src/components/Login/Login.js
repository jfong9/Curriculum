import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { accountsPassword, apolloClient } from 'utils/accounts'
import FormError from 'components/FormError'
import loginStyle from './Login.module.css'

function Login() {
    const history = useHistory();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            await accountsPassword.login({
                user: {
                    username
                },
                password,
                // schools: [{username:'', type:''}]
            })
            await apolloClient.resetStore();
            history.push(`/MainPortal`)
        } catch(err) {
            setError(err.message);
        }
    }
    return (
    <form className={loginStyle.loginBox} onSubmit={onSubmit}>
        <input
            className={loginStyle.input}
            type='text' 
            placeholder='Username'
            name='username' 
            value={username} 
            onChange={e => setUsername(e.target.value)}
        />
        <input
            className={loginStyle.input}
            type='password' 
            placeholder='Password' 
            name='password' 
            value={password} 
            onChange={(e) => {setPassword(e.target.value)}
            }
        />
        <input className={loginStyle.submitButton} type='submit' value='Sign In'/>
        {error && <FormError className={loginStyle.error1} error={error}/>}
    </form>
    )
}

export default Login