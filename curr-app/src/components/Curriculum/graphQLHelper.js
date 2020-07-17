export async function runDeleteMutation( deleteFunc, parentId, childId) {
    deleteFunc({
        variables: {
            "input": { 
                "parentId": parentId,
                "deleteId": childId, 
            }
        }
    })
}