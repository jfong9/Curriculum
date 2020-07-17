import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { accountsClient, apolloClient } from 'utils/accounts'

function Logout({className}) {
    const onLogout = async () => {
        await accountsClient.logout();
        apolloClient.resetStore();
        history.push('/');
    }

    const history = useHistory();
    return (
        <label className={className} onClick={onLogout}>Logout</label>
    )
}

export default Logout;