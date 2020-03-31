'use strict'

const { ApolloServer, makeExecutableSchema} = require('apollo-server');
const { MongoClient } = require('mongodb');
const { Mongo } = require('@accounts/mongo');
const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { mergeTypeDefs, mergeResolvers } = require('graphql-toolkit');
const { AccountsModule } = require('@accounts/graphql-api');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

MongoClient.connect(
    process.env.TEST_DB_URI,    
    //'mongodb+srv://BlitzZero:AtlasAdminZero1!@cluster0-5zoin.mongodb.net?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true},
).catch(err => {
    console.error(err.stack);
    process.exit(1);
}).then(async client => {
    const db = client.db(process.env.TEST_DB)
    const accountsMongo = new Mongo(db)

    const accountsPassword = new AccountsPassword({
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
    
    const schema = makeExecutableSchema({
        typeDefs: mergeTypeDefs([accountsGraphQL.typeDefs, typeDefs]),
        resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
        schemaDirectives: {
            ...accountsGraphQL.schemaDirectives
        }
    })


    const server = new ApolloServer({
        schema,
        context: accountsGraphQL.context,
        dataSources: () => {
            return {
                accountsAPI: accountsServer,
            }
        }
    });
    
    server.listen(port).then(({url}) => {
    console.log(`Server ready at ${url}`)
})
}).catch(err => {
    console.error(err.stack);
    process.exit(1);
})