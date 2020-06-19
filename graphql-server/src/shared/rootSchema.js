'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
    scalar MongoObjectId
    
    input MoveInput {
        parentId: MongoObjectId!
        childId: MongoObjectId!
        index: Int
    }

    input DeleteInput {
        parentId: MongoObjectId!
        deleteId: MongoObjectId!
    }

    input EditInput {
        id: MongoObjectId!
        title: String!
    }
`

module.exports = typeDefs;