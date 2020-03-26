import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { accountsGraphQL } from 'utils/accounts'
import FormError from 'components/FormError'

const LogInLinkButton = props => (
    <Link to='/login' {...props} >
        <button>
            Log In
        </button>
    </Link>
);

function Signup( {history} ) {

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
    const ref = React.createRef();
    return (
        <form onSubmit={handleCreate}>
            <label>
                Userame:
                <input 
                    type='text' 
                    name='username' 
                    value={user.username} 
                    onChange={(e) => {setUser({...user, username: e.target.value})}}
                />
            </label>
            <br/>
            <label>
                Email:
                <input 
                    type='text' 
                    name='email' 
                    value={user.email} 
                    onChange={(e) => {setUser({...user, email: e.target.value})}}
                />
            </label>
            <br/>
            <label>
                Password:
                <input 
                    type='text' 
                    name='password' 
                    value={user.password} 
                    onChange={(e) => {setUser({...user, password: e.target.value})}}
                />
            </label>
            <br/>
            <input type='submit' value='create user'/>
            
            <LogInLinkButton>Log In1</LogInLinkButton>
            {error && <FormError error={error}/> }
        </form>
    )
}

export default Signup;