'use strict'

const { getNewCategory, getNewItem } = require('../shared/resolverUtils')
const { deleteTree } = require('../dataSources/sharedOperations')

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
            const res = await dataSources.categoryAPI.archiveChildCategory(parentId, childId)
            return res.value;
        },

        unarchiveChildCategory: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const res = await dataSources.categoryAPI.unarchiveChildCategory(parentId, childId)
            return res.value
        },

        archiveItem: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const res = await dataSources.categoryAPI.archiveItem(parentId, childId)
            return res.value;
        },

        unarchiveItem: async (_, { input }, { dataSources }) => {
            const { parentId, childId } = input
            const res = await dataSources.categoryAPI.unarchiveItem(parentId, childId)
            return res.value;
        },

        moveCurrChildCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrChildCategory(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.categoryAPI.addCurrChildCategoryAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return res
        },

        moveCurrCategoryItemTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrCategoryItem(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.categoryAPI.addCurrCategoryItemAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.categoryItemsAPI.getCategoryItemById(parentId);
            }
            return res
        },

        moveArchChildCategoryTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeArchChildCategory(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.categoryAPI.addArchChildCategoryAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.categoryAPI.getCategoryById(parentId);
            }
            return res
        },

        moveArchCategoryItemTo: async (_, { input }, { dataSources }) => {
            const { parentId, childId, index } = input
            const { modifiedCount } = await dataSources.categoryAPI.removeArchCategoryItem(parentId, childId);
            let res = undefined;
            if (modifiedCount) {
                res =  (await dataSources.categoryAPI.addArchCategoryItemAt(parentId, childId, index)).value
            }
            else {
                res = await dataSources.categoryAPI.getCategoryItemById(parentId);
            }
            return res
        },

        delCurrChildCategory: async (_, { input }, { dataSources }) => {
            const { parentId, deleteId }  = input
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrChildCategory(parentId, deleteId);
            let res = await dataSources.categoryAPI.getCategoryById(parentId);
            if ( modifiedCount ) {
                deleteTree(dataSources, deleteId)
            }
            return res;
        },

        delCurrCategoryItem: async (_, { input }, { dataSources }) => {
            const { parentId, deleteId } = input;
            const { modifiedCount } = await dataSources.categoryAPI.removeCurrCategoryItem(parentId, deleteId);
            if ( modifiedCount ) {
                dataSources.categoryItemsAPI.collection.remove({ _id: deleteId })
            }
            let res = await dataSources.categoryAPI.getCategoryById(parentId);
            return res;
        },

        editCategory: async (_, { input }, { dataSources }) => {
           const { id, title } = input
           return (await dataSources.categoryAPI.editCategory(id, title)).value;
        }
    },

    Category: {

        currentChildren: async (obj, { input }, { dataSources }) => { 
            if (!obj.currentChildren) return [];
            // console.log("obj", obj)
            let res =  await dataSources.categoryAPI.getManyCategoriesById(obj.currentChildren)
            // console.log("curChildren", res)
            return res
        },
        archivedChildren: async (obj, { input }, { dataSources }) => { 
            if (!obj.archivedChildren) return [];
            // console.log("obj", obj)
            let res =  await dataSources.categoryAPI.getManyCategoriesById(obj.archivedChildren)
            // console.log("curChildren", res)
            return res
        },
        currentItems: async (obj, { input }, { dataSources }) => {
            if (!obj.currentItems) return [];
            return dataSources.categoryItemsAPI.getItems(obj.currentItems)
        },

        archivedItems: async (obj, { input }, { dataSources }) => {
            if (!obj.archivedItems) return [];
            return dataSources.categoryItemsAPI.getItems(obj.archivedItems);
        }
    }
}

module.exports = resolvers;