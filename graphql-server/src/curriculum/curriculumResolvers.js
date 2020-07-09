'use strict'

const { getNewCategory } = require('../shared/resolverUtils')
const { deleteTree } = require('../dataSources/sharedOperations')

const resolvers = {
    Query: {
        curriculum: (_, { input }, { dataSources } ) => {
            const { schoolId, art } = input
            // console.log("1", input)
            return dataSources.curriculumAPI.getCurriculum(schoolId, art)
        },

        curriculumById: async (_, { input }, { dataSources }) => {
            return await dataSources.curriculumAPI.getCurriculumById(input);
        }
    },
    
    Mutation: {
        createCurriculum:(_, { input }, { dataSources } ) => {
            const { schoolId, art } = input
            // console.log("createCurr Input:", input)
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
            const res = await dataSources.curriculumAPI.archiveTopCategory(parentId, childId)
            console.log("archive: ", res)
            return res.value;
        },

        unarchiveTopCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const res = await dataSources.curriculumAPI.unarchiveTopCategory(parentId, childId)
            console.log("unarchive: ", res)
            return res.value
        },
        
        moveTopCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.curriculumAPI.removeTopCategory(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.curriculumAPI.addTopCategoryAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.curriculumAPI.getCurriculumById(parentId);
            }
            return res
        },

        moveArchTopCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.curriculumAPI.removeArchTopCategory(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.curriculumAPI.addArchTopCategoryAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.curriculumAPI.getCurriculumById(parentId);
            }
            return res
        },

        delCurrTopCategory: async (_, { input }, { dataSources }) => {
            const { parentId: curriculumId, deleteId: topCategoryId }  = input
            const { modifiedCount } = await dataSources.curriculumAPI.removeTopCategory(curriculumId, topCategoryId);
            let res = await dataSources.curriculumAPI.getCurriculumById(curriculumId);
            if ( modifiedCount ) {
                deleteTree(dataSources, topCategoryId)
            }
            return res;
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