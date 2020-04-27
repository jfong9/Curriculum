'use strict'

const { ObjectId } = require('bson');
const { getNewCategory } = require('../shared/resolverUtils')

var testCurrObj = {
    id: "5e8bc4de6f71941f01666089", 
    schoolid: "abcd",
    art: "KF"
}

var testCategory = {
    _id: ObjectId("5e8bc4de6f71941f01666089"),
    title: "title 1",
    currentItems: [],
    archivedItems: [],
    studentSpecificItems: [],
}

const resolvers = {
    Query: {
        curriculum: (_, { input }, { dataSources } ) => {
            const { schoolId, art } = input
            console.log("1", input)
            return dataSources.curriculumAPI.getCurriculum(schoolId, art)
        },
    },
    
    Mutation: {
        createCurriculum:(_, { input }, { dataSources } ) => {
            const { schoolId, art } = input
            console.log("createCurr Input:", input)
            let obj =  dataSources.curriculumAPI.createCurriculum( {
                schoolId,
                art,
                topCategories: [],
                archivedTopCategories: [],
            })
            // console.log(obj);
            return obj;
        },


        createTopCategory: async (_, { input }, { dataSources } ) => {
            const { parentId, title, index } = input

            console.log(index)
            let catAdded = await dataSources.categoryAPI.createCategory(getNewCategory(title))
            await dataSources.curriculumAPI.createTopCategory( parentId, catAdded._id )
            return catAdded
        }
    },

    Curriculum: {
        topCategories: (obj, _, { dataSources } ) => {
            if (!obj.topCategories) return [];
            return dataSources.categoryAPI.getManyCategoriesById(obj.topCategories); 
        },

        archivedTopCategories: (obj, __, { dataSources } ) => {
            if (!obj.archivedTopCategories) return [];
            return dataSources.categoryAPI.getManyCategoriesById(obj.archivedTopCategories)
        }
    }

}

module.exports = resolvers;