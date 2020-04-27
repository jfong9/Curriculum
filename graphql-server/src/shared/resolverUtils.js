'use strict'

function getNewCategory(title, parentId = null) {
    return {
        title,
        parents: [parentId],
        currentChildren: [],
        archivedChildren: [],
        studentSpecificChildren: [],
        currentItems: [],
        archivedItems: [],
        studentSpecificItems: [],
        index: -1,
        status: null
    }
}

function getNewItem(title, parentId) {
    return {
        title,
        parents: [parentId],
        index: -1, 
        status: null 
    }
}

module.exports = {
    getNewCategory,
    getNewItem,
}