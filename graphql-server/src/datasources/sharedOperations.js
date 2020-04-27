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

module.exports = {
    moveIdBtArrays,
    removeIdFromArray,
    addIdToArrayAt,
    addIdToArray
}
