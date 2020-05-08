'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        getCurrCategoryElements(input: MongoObjectId!): [Category] #gets all non-archived Categories
        getArchCategoryElements(input: MongoObjectId!): [Category] #gets all categories hidden by being archived
        getAllCategoryElements(input: MongoObjectId!): [Category] #gets ALL categories
        category(input: MongoObjectId): Category
    }
    extend type Mutation {
        createCurrChildCategory(input: CategoryInput!) : Category!
        createCurrCategoryItem(input: CategoryItemInput!) : Category!
       
        createArchChildCategory(input: CategoryInput!) : Category!
        createArchCategoryItem(input: CategoryItemInput!) : Category!
       
        moveCurrChildCategoryTo(input: MoveInput! ) : Category!
        moveCurrCategoryItemTo(input: MoveInput!) : Category! 
       
        moveArchChildCategoryTo(input: MoveInput!) : Category!
        moveArchCategoryItemTo(input: MoveInput!) : Category!
       
        archiveChildCategory(input: MoveInput!) : Category!
        unarchiveChildCategory(input: MoveInput!) : Category!

        delCurrChildCategory(input: DeleteInput!) : Category!
        delArchChildCategory(input: DeleteInput!) : Category!

        editCurrCategory(input: CategoryInput!) : Category!
    }

    type Category {
        _id: MongoObjectId
        title: String
        parents: [String]
        currentChildren: [Category]
        archivedChildren: [Category]
        studentSpecificChildren: [Category]
        currentItems: [CategoryItem]
        archivedItems: [CategoryItem]
        studentSpecificItems: [CategoryItem]
    }
    
    input CategoryInput {
        parentId: MongoObjectId!
        title: String!
        index: Int
    }
`
module.exports = typeDefs