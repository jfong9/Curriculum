'use strict'

const { ApolloServer, makeExecutableSchema} = require('apollo-server');
const { MongoClient } = require('mongodb');
const { Mongo } = require('@accounts/mongo');
const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { AccountsModule } = require('@accounts/graphql-api');

const  CurriculumAPI  = require('./datasources/curriculum');
const  CategoryAPI  = require('./datasources/category');
const  CategoryItemsAPI  = require('./datasources/categoryItems');
const  StudentCurrCurricAPI  = require('./datasources/studentCurrentCurriculum');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

MongoClient.connect(
    process.env.TEST_DB_URI,    
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
        typeDefs: [accountsGraphQL.typeDefs, ...typeDefs],
        resolvers: [accountsGraphQL.resolvers, ...resolvers],
        schemaDirectives: {
            ...accountsGraphQL.schemaDirectives
        }
    })


    const server = new ApolloServer({
        schema,
        context: accountsGraphQL.context,
        dataSources: () => ({
            accountsAPI: accountsServer,
            curriculumAPI: new CurriculumAPI(db.collection('curriculum')),
            categoryAPI: new CategoryAPI(db.collection('categories')),
            categoryItemsAPI: new CategoryItemsAPI(db.collection('categoryItems')),
            studentCurrCurricAPI: new StudentCurrCurricAPI(db.collection('studentCurrentCurriculum'))
        }),
        cors: { 
            origin: '*',
            credentials: true
        }
    });
    
    server.listen(port).then(({url}) => {
    console.log(`Server ready at ${url}`)
})
}).catch(err => {
    console.error(err.stack);
    process.exit(1);
})