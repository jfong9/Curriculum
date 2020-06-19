'use strict'

const { MongoDataSource } = require('apollo-datasource-mongodb')
const { moveIdBtArrays, removeIdFromArray, addIdToArrayAt } = require('../datasources/sharedOperations')

class CurriculumAPI extends MongoDataSource {
    constructor(args) {
        super(args);
    }

    initialize(config) {
        super.initialize(config)
    }

    async getCurriculum(schoolId, art) {
        console.log("getCurr", schoolId, typeof schoolId)
        return await this.collection.findOne(
            {
                schoolId: schoolId,
                art: art
            }
        )
    }

    async getCurriculumById(id) {
        return await this.findOneById(id);
    }

    async createCurriculum(curriculum) {
        let result =  await this.collection.insertOne(curriculum)
        return result.ops[0];
    }

    async createTopCategory(currId, categoryId) {
        console.log("addTop:", currId, categoryId)
        return await this.collection.updateOne(
            { _id: currId},
            { $addToSet: {
                topCategories: categoryId
            }}
        )
    }
    
    async archiveTopCategory(parentId, childId) {
       return await moveIdBtArrays({
            collection: this.collection,
            id: parentId,
            childId: childId,
            from: "topCategories",
            to:  "archivedTopCategories"
       })
    }

    async unarchiveTopCategory(parentId, childId) {
       return await moveIdBtArrays({
            collection: this.collection,
            id: parentId,
            childId: childId,
            from:  "archivedTopCategories",
            to: "topCategories",
       })
    }

    async removeTopCategory(parentId, childId) {
        return removeIdFromArray( {
            collection: this.collection,
            arrayName: 'topCategories', 
            parentId,
            childId
        })
    }

    async removeArchTopCategory(parentId, childId) {
        return removeIdFromArray( {
            collection: this.collection,
            arrayName: 'archivedTopCategories', 
            parentId,
            childId
        })
    }

    async addTopCategoryAt(parentId, childId, pos) {
        return addIdToArrayAt({
            collection: this.collection,
            arrayName: "topCategories",
            parentId,
            childId,
            pos 
        })
    }

    async addArchTopCategoryAt(parentId, childId, pos) {
        return addIdToArrayAt({
            collection: this.collection,
            arrayName: "archivedTopCategories",
            parentId,
            childId,
            pos 
        })
    }
}

module.exports = CurriculumAPI
