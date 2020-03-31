import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { accountsClient, apolloClient } from 'utils/accounts'

function Logout() {
    const onLogout = async () => {
        await accountsClient.logout();
        apolloClient.resetStore();
        history.push('/login');
    }

    const history = useHistory();
    return (
        <button onClick={onLogout}>Logout</button>
    )
}

export default Logout;