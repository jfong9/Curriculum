
'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        curriculum(input: CurriculumInput!): Curriculum 
    }

    extend type Mutation {
        createCurriculum(input: CurriculumInput!): Curriculum! #this might need to be moved to when an art is created
        createTopCategory(input: CategoryInput!): Category! 
        
        moveTopCategoryTo(input: MoveInput! ) : Curriculum!
        moveArchTopCategoryTo(input: MoveInput!) : Curriculum!
        archiveTopCategory(input: MoveInput!) : Curriculum!
        unarchiveTopCategory(input: MoveInput!) : Curriculum!
    } 

    input CurriculumInput {
        schoolId: MongoObjectId!
        art: String!
    }

    type Curriculum {
        _id: MongoObjectId 
        schoolId: MongoObjectId 
        art: String
        topCategories: [Category]
        archivedTopCategories: [Category]
    }


`

module.exports = typeDefs