import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { accountsPassword, apolloClient } from 'utils/accounts'
import FormError from 'components/FormError'

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
    <form onSubmit={onSubmit}>
        <label>
            Userame:
            <input 
                type='text' 
                name='username' 
                value={username} 
                onChange={e => setUsername(e.target.value)}
            />
        </label>
        <label>
            Password:
            <input 
                type='password' 
                name='password' 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}
                }
            />
        </label>
        <input type='submit' value='Log In'/>
        {error && <FormError error={error}/> }
    </form>
    )
}

export default Login