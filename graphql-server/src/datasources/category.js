
'use strict'

const { MongoDataSource } = require('apollo-datasource-mongodb')
const { moveIdBtArrays, addIdToArrayAt} = require('../datasources/sharedOperations')
const { ObjectId } = require('bson')

const ARCHIVED = 'archivedChildren'
const CURRENT = 'currentChildren'
class CategoryAPI extends MongoDataSource {
    constructor(args) {
        super(args);
    }

    initialize(config) {
        super.initialize(config)
    }
    
    async getCategoryById( categoryId ) {
        // return await this.collection.findOne({_id: categoryId})
        return await this.findOneById(categoryId) //we'll use this to take advantage of mongodatasource dataloader
    }

    async getManyCategoriesById( categories ) {
        return await this.findManyByIds( categories )
    }

    async getCurrCategoryElements( rootId ) {
        let rootCategory = await this.getCategoryById(rootId)
        let ret = await this.getAllCategoryChildren( rootId, CURRENT);
        ret.unshift(rootCategory);
        return ret;
    }

    async getArchCategoryElements( rootId ) {
        const allCats = []
        let currentCategories = await this.getCurrCategoryElements(rootId);
        let archivedCats = currentCategories
            .filter( category => (category.archivedChildren.length > 0 || category.archivedItems.length > 0))
        for (const category of archivedCats) {
            allCats.push(category)
            for (const archivedCatId of category.archivedChildren) {
                let nestedTree = await this.getAllCategoryElements(archivedCatId)
                allCats.push(...nestedTree)
            }
        }
        return allCats;
    }


    async getAllCategoryElements( rootId ) {
        const currQueue = []; //needs to explore the current tree of these nodes
        const archQueue = []; //needs to explore the archive tree of these nodes
        const allCats = [];
        let nestedCategories = await this.getCurrCategoryElements(rootId) 
        archQueue.push(...nestedCategories)
        while (currQueue.length > 0 || archQueue.length > 0) {
            let archCat = archQueue.shift();
            if (archCat) {
                nestedCategories = await this.getAllCategoryChildren(archCat._id, ARCHIVED)
                currQueue.push(...nestedCategories)
                allCats.push(archCat)
            }
            let currCat = currQueue.shift();
            if (currCat) {
                nestedCategories = await this.getAllCategoryChildren(currCat._id, CURRENT)
                archQueue.push(...nestedCategories)
                allCats.push(currCat)
            }
        }
        return allCats;
    }

    async getAllCategoryChildren( rootid, collectionName ) {
        let categoryTree = await this.collection.aggregate( [
            { $match : { _id: ObjectId(rootid)}},
            { $graphLookup: {
                from: "categories",
                startWith: `$${collectionName}`,
                connectFromField: `${collectionName}`,
                connectToField: "_id",
                as: "allNestedChildren"
              }
            }
        ]).toArray();
        let { allNestedChildren} = categoryTree[0]
        return [...allNestedChildren]
    }

    async createCategory(category) {
        try {
            const result = await this.collection.insertOne(category)
            // console.log("createCat:", result)
            return result.ops[0];
        }
        catch (err) {
            console.error(`Something went wrong with createCategory: ${err}`)
            throw err;
        }
    }

    async addCurrChildCategory(parentId, categoryId) {
        return await this.collection.updateOne(
            { _id: parentId},
            { $addToSet: {
                currentChildren: categoryId
            }}
        )
    }
    
    async addArchChildCategory(parentId, categoryId) {
        return await this.collection.updateOne(
            { _id: parentId},
            { $addToSet: {
                archivedChildren: categoryId
            }}
        )
    }
    async addCurrChildCategoryAt(parentId, childId, pos) {
        return addIdToArrayAt({
            collection: this.collection,
            arrayName: 'currentChildren',
            parentId,
            childId,
            pos
        })
    }
    
    async addCurrCategoryItemAt(parentId, childId, pos) {
        return addIdToArrayAt({
            collection: this.collection,
            arrayName: 'currentItems',
            parentId,
            childId,
            pos
        })
    }


    archiveChildCategory(parentId, childId) {
        return moveIdBtArrays({
            collection: this.collection, 
            parentId, 
            childId, 
            from: "currentChildren", 
            to: "archivedChildren"})
    }
    
    unarchiveChildCategory(parentId, childId) {
        return moveIdBtArrays({
            collection: this.collection, 
            parentId, 
            childId, 
            from: "archivedChildren", 
            to: "currentChildren"})
    }

    async addCurrCategoryItem(parentId, categoryItemId) {
        return addIdToArray({
            collection: this.collection,
            arrayName: "currentItems",
            parentId,
            elementId: categoryItemId
        })
    }

    async addArchCategoryItem(parentId, categoryItemId) {
        return addIdToArray({
            collection: this.collection,
            arrayName: "archivedItems",
            parentId,
            elementId: categoryItemId
        })
    }
    async removeCurrCategoryItem(parentId, childId) {
        return removeIdFromArray( {
            collection: this.collection,
            arrayName: "currentItems", 
            parentId,
            childId
        })
    }

    async removeCurrChildCategory(parentId, childId) {
        return removeIdFromArray( {
            collection: this.collection,
            arrayName: 'currentChildren', 
            parentId,
            childId
        })
    }
}

module.exports = CategoryAPI