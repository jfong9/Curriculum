
'use strict'

const { MongoDataSource } = require('apollo-datasource-mongodb')

class StudentCurrCurricAPI extends MongoDataSource {
    constructor(args) {
        super(args);
    }

    initialize(config) {
        super.initialize(config)
    }

    async getStudentCurric(studentId, art) {
        return await this.collection.findOne({studentId: studentId, art: art});
    }

    async getStudentCurrCurricById(id) {
        return await this.findOneById(id);
    }
    async addTopCurrElements(studentId, art, topCatId, currentIds, itemIds) {
        
        let updateObject = {};
        if (topCatId) updateObject.topCategories = { $each: [topCatId], $position: 0 };
        if (currentIds.length > 0) updateObject.currentCategories = { $each: currentIds }
        if (itemIds.length > 0) updateObject.currentItems = { $each: itemIds }
        if (Object.keys(updateObject).length === 0) return;

        return await this.collection.updateOne(
            { studentId: studentId, art: art},
            {
                $push: updateObject
            }
        )
    }


    async clearCurrCurric(studentId, art) {
        return await this.collection.updateOne(
            { studentId: studentId, art: art},
            {
                $set: {
                    topCategories: [],
                    currentCategories: [],
                    currentItems: [],
                    hiddenCategories: [],
                    hiddenItems: []
                }
            }
        )
    }

    async updateStatus(id, categoryId, collectionName, status) {
        return await this.collection.updateOne(
            { _id: id, [`${collectionName}.id`]: categoryId},
            {  
                $set: { [`${collectionName}.$.status`]: status} 
            }
        )
    }

}

module.exports = StudentCurrCurricAPI