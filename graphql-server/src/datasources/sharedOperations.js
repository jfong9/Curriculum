'use strict'

async function moveIdBtArrays(moveInput) {
    const { collection, parentId, childId, to, from } = moveInput
    return await collection.findOneAndUpdate(
        {_id: parentId },
        { $addToSet: {
            [to]: childId
        },
            $pull: {
            [from]: childId
            } 
        },
        { returnOriginal: false }
    )
}

async function removeIdFromArray(removeInput) {
    const { collection, arrayName, parentId, childId } = removeInput
    try {
        return await collection.updateOne( 
            { _id: parentId },
            {
                $pull: {
                    [arrayName]: childId
                }
            }
        )
    } catch (err) {
        console.error(`Something went wrong at removeIdFromArray: ${err}` )
        throw err;
    }
}

async function addIdToArrayAt(addInput) {
    const {collection, arrayName, parentId, childId, pos } = addInput
    try {
        return await collection.findOneAndUpdate(
            { _id: parentId },
            { 
                $push: {
                    [arrayName]: {
                        $each: [childId],
                        $position: pos
                    }
                }
            },
            { returnOriginal: false }
        )
    } catch (err) {
        console.error(`Something went wrong at addIdToArrayAt: ${err}` )
        throw err;
    }
}

async function addIdToArray(addItemInput) {
    const {collection, arrayName, parentId, elementId } = addItemInput
    return await collection.updateOne(
            { _id: parentId },
            { $addToSet: {
                    [arrayName]: elementId
            }}
        )
}

async function deleteMany(deleteManyInput) {
    const { collection, itemArray } = deleteManyInput;
    return await collection.deleteMany(
        { 
            _id: {
                $in: itemArray
        }}
    )
}

async function editTitle(editInput) {
    const { collection, id, title} = editInput
    return await collection.findOneAndUpdate(
        {_id: id },
        { $set: {
            title: title
        }},
        { returnOriginal: false }
    )
}

async function deleteTree(dataSources, childId) {
    console.log("deleteTree")
    const allCategories = await dataSources.categoryAPI.getAllCategoryElements(childId);
    const allCategoryIds = allCategories.map(cat => cat._id)
    const allCategoryItemIds = [];
    for (const cat of allCategories) {
        allCategoryItemIds.push(...cat.currentItems.map(id => id))
        allCategoryItemIds.push(...cat.archivedItems.map(id => id))
    }
    // console.log(typeof allCategoryIds[0]) ;
    // console.log(allCategoryItemIds);
    deleteMany({
        collection: dataSources.categoryAPI.collection, 
        itemArray: allCategoryIds})  
        .then(result => console.log(`Deleted  ${result.deletedCount} item(s).`))
        .catch(err => console.error(`Delete failed with error: ${err}`));
    deleteMany({
        collection: dataSources.categoryItemsAPI.collection, 
        itemArray: allCategoryItemIds}) 
        .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
        .catch(err => console.error(`Delete failed with error: ${err}`));
}

module.exports = {
    moveIdBtArrays,
    removeIdFromArray,
    addIdToArrayAt,
    addIdToArray,
    deleteTree,
    editTitle,
}
