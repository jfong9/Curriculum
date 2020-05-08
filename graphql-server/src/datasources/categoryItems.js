'use strict'

const { MongoDataSource } = require('apollo-datasource-mongodb')
const { editTitle } = require('../datasources/sharedOperations')

class CategoryItemsAPI extends MongoDataSource {
    constructor(args) {
        super(args);
    }

    initialize(config) {
        super.initialize(config)
    }
   
    async getCategoryItemById(id) {
        try {
            return await this.findOneById(id)
            
        }
        catch (err) {
            console.error(`Something went wrong with getCategoryItemById: ${err}`)
            throw err;
        }
    }
    async createCategoryItem(item) {
        try {
            const result = await this.collection.insertOne(item)
            return result.ops[0];
        }
        catch (err) {
            console.error(`Something went wrong with createCategoryItem: ${err}`)
            throw err;
        }
    }
    
    async getItems(items) {
        return await this.findManyByIds(items)
    }

    async editCategoryItem(parentId, title){
         return editTitle({
            collection: this.collection,
            id: parentId,
            title
        })
    }
}

module.exports = CategoryItemsAPI