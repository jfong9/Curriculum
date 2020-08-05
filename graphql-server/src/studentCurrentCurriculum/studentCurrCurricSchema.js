'use strict'

const { gql } = require('apollo-server');

const typeDefs = gql`
    extend type Query {
        getStudentCurrCurric(input: StudentCurrInput!): StudentCurriculum!
        getStudentCurrCurricById(input: MongoObjectId!): StudentCurriculum!
    }

    extend type Mutation {
        addTopCurrElements(input: StudentCurrElementsInput!): StudentCurriculum! 
        clearCurrCurric(input: StudentCurrInput!): StudentCurriculum!
        updateStatus(input: StudentCurrUpdate!): StudentCurriculum!
    }

    input StudentCurrInput {
        studentId: MongoObjectId!
        art: String!
    }

    input StudentCurrElementsInput {
        studentCurrInput: StudentCurrInput!
        categoryId: MongoObjectId!
    }

    input StudentCurrUpdate {
        id: MongoObjectId!
        categoryId: MongoObjectId!
        collection: String!
        status: String!
    }
    type StudentCurriculum {
        _id: MongoObjectId!
        studentId: MongoObjectId!
        art: String!
        topCategories: [StudentCurriculumCategory]
        currentCategories: [StudentCurriculumCategory]
        currentItems: [StudentCurriculumCategory]
        hiddenCategories: [StudentCurriculumCategory]
        hiddenItems: [StudentCurriculumCategory]
    }

    type StudentCurriculumCategory {
        id: MongoObjectId!
        status: String
    }
`

module.exports = typeDefs;


