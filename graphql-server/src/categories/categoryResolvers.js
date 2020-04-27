'use strict'

const { getNewCategory, getNewItem } = require('../shared/resolverUtils')

const resolvers = {
    Query: {
        getCurrCategoryElements: async (_, { input }, { dataSources } ) => {
            return await dataSources.categoryAPI.getCurrCategoryElements(input)
        },
        getArchCategoryElements: async (_, { input }, { dataSources } ) => {
            return await dataSources.categoryAPI.getArchCategoryElements(input)
        },
        getAllCategoryElements: async (_, { input }, { dataSources } ) => {
            return await dataSources.categoryAPI.getAllCategoryElements(input);
        },
        category: async (_, { input }, { dataSources } ) => {
            return await dataSources.categoryAPI.getCategoryById(input)
        } 
    },
    Mutation: {
        createCurrChildCategory:  async (_, { input }, { dataSources } ) => {
            const { parentId, title, index } = input
            let catAdded = await dataSources.categoryAPI.createCategory(getNewCategory(title, parentId))
            if (!index) {
                await dataSources.categoryAPI.addCurrChildCategory(parentId, catAdded._id)
            }
            else {
                await dataSources.categoryAPI.addCurrChildCategoryAt(parentId, catAdded._id, index)
            }
            return catAdded
        },
        
        createArchChildCategory:  async (_, { input }, { dataSources } ) => {
            const { parentId, title, index } = input
            let catAdded = await dataSources.categoryAPI.createCategory(getNewCategory(title, parentId))
            if (!index) {
                await dataSources.categoryAPI.addArchChildCategory(parentId, catAdded._id)
            }
            else {
                await dataSources.categoryAPI.addArchChildCategoryAt(parentId, catAdded._id, index)
            }
            return catAdded
        },
        
        createCurrCategoryItem: async (_, { input }, { dataSources }) => {
            const { parentId, title, index } = input
            let itemAdded = await dataSources.categoryItemsAPI.createCategoryItem(getNewItem(title, parentId))
            if (!index) {
                await dataSources.categoryAPI.addCurrCategoryItem(parentId, itemAdded._id)
            }
            else {
                await dataSources.categoryAPI.addCurrCategoryItemAt(parentId, itemAdded._id, index)
            }
            return itemAdded;
        },

        createArchCategoryItem: async (_, { input }, { dataSources }) => {
            const { parentId, title, index } = input
            let itemAdded = await dataSources.categoryItemsAPI.createCategoryItem(getNewItem(title, parentId))
            if (!index) {
                await dataSources.categoryAPI.addArchCategoryItem(parentId, itemAdded._id)
            }
            else {
                await dataSources.categoryAPI.addArchCategoryItemAt(parentId, itemAdded._id, index)
            }
            return itemAdded;
        },

        archiveChildCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const ret = await dataSources.categoryAPI.archiveChildCategory(parentId, childId)
            console.log("archive: ", ret)
            return ret.value;
        },

        unarchiveChildCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const ret = await dataSources.categoryAPI.unarchiveChildCategory(parentId, childId)
            console.log("unarchive: ", ret)
            return ret.value
        },

        moveCurrChildCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrChildCategory(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.categoryAPI.addCurrChildCategoryAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return ret
        },

        moveCurrCategoryItemTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrCategoryItem(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.categoryAPI.addCurrCategoryItemAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryItemById(parentId);
            }
            return ret
        },

        moveArchChildCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeArchChildCategory(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.categoryAPI.addArchChildCategoryAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return ret
        },

        moveArchCategoryItemTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeArchCategoryItem(parentId, childId);
            let ret = undefined;
            if (modifiedCount) {
                ret =  (await dataSources.categoryAPI.addArchCategoryItemAt(parentId, childId, index)).value
            }
            else {
                ret = await dataSources.categoryAPI.getCategoryItemById(parentId);
            }
            return ret
        }
    },

    Category: {

        currentChildren: async (obj, { input }, { dataSources }) => { 
            if (!obj.currentChildren) return [];
            // console.log("obj", obj)
            let ret =  await dataSources.categoryAPI.getManyCategoriesById(obj.currentChildren)
            // console.log("curChildren", ret)
            return ret
        },
        archivedChildren: async (obj, { input }, { dataSources }) => { 
            if (!obj.archivedChildren) return [];
            // console.log("obj", obj)
            let ret =  await dataSources.categoryAPI.getManyCategoriesById(obj.archivedChildren)
            // console.log("curChildren", ret)
            return ret
        },
        currentItems: async (obj, { input }, { dataSources }) => {
            if (!obj.currentItems) return [];
            return dataSources.categoryItemsAPI.getItems(obj.currentItems)
        }
    }
}

module.exports = resolvers;