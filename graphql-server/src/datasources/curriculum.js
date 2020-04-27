'use strict'

const { MongoDataSource } = require('apollo-datasource-mongodb')
const { moveId } = require('../datasources/sharedOperations')

class CurriculumAPI extends MongoDataSource {
    constructor(args) {
        super(args);
    }

    initialize(config) {
        super.initialize(config)
    }

    async getCurriculum(schoolId, art) {
        console.log("getCurr", schoolId, art)
        return await this.collection.findOne(
            {
                schoolId: schoolId,
                art: art
            }
        )
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
       return await moveId({
            collection: this.collection,
            id: parentId,
            childId: childId,
            from: "topCategories",
            to:  "archivedTopCategories"
       })
    }

    async unarchiveTopCategory(parentId, childId) {
       return await moveId({
            collection: this.collection,
            id: parentId,
            childId: childId,
            from:  "archivedTopCategories",
            to: "topCategories",
       })
    }

    async removeTopCategory(currId, categoryId) {
        return await this.collection.updateOne(
            { _id: currId },
            { $pull: {
                topCategories: categoryId
            }}
        )
    }


}

module.exports = CurriculumAPI
