'use strict'

const { gql } = require('apollo-server');


const typeDefs = gql`
    extend type Mutation {
        editCategoryItem(input: EditInput!): CategoryItem
    }

    input CategoryItemInput {
        parentId: MongoObjectId!
        title: String!
        index: Int
    }
    
    type CategoryItem {
        _id: MongoObjectId!
        parentId: MongoObjectId
        title: String
    }
`

module.exports = typeDefs;