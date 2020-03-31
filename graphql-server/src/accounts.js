'use strict'
const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { AccountsModule } = require('@accounts/graphql-api');
const { Mongo } = require('@accounts/mongo');

const accountsMongo = new Mongo(db)

const accountsPassword = new AccountsPassword({
    //customize pw behavior server here 
})

const accountsServer = new AccountsServer(
    {
        db: accountsMongo,
        tokenSecret: process.env.TOKEN_SECRET
    },
    {
        password: accountsPassword
    }
)
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

module.exports = {
    accountsMongo: accountsMongo,
    accountsPassword: accountsPassword,
    accountsServer: accountsServer,
    accountsGraphQL: asccountsGraphQL
}

