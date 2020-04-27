'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar MongoObjectId
`

module.exports = typeDefs;