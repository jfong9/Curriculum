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
        },
        
        archiveTopCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const ret = await dataSources.curriculumAPI.archiveTopCategory(parentId, childId)
            console.log("archive: ", ret)
            return ret.value;
        },

        unarchiveTopCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const ret = await dataSources.curriculumAPI.unarchiveTopCategory(parentId, childId)
            console.log("unarchive: ", ret)
            return ret.value
        },
        
        moveTopCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.curriculumAPI.removeTopCategory(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.curriculumAPI.addTopCategoryAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return ret
        },

        moveArchTopCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.curriculumAPI.removeArchTopCategory(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.curriculumAPI.addArchTopCategoryAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return ret
        },

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