import React from 'react'
import { MOVE_TOP_CAT, DELETE_TOP_CAT } from 'actions/curriculumActions'
import { EDIT_CAT } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import EditButton from 'components/Buttons/Edit'
import MoveButton from 'components/Buttons/Move'

export default function DisplayTopCategories({topCategories, parentId, ...props}) {
    function moveIndexDown(index) {
        const length = topCategories.length
        let newIndex = 0
        if (index > length) newIndex = length -1;
        else if (index > 0) newIndex = index - 1;
        return newIndex
    }

    function moveIndexUp(index) {
        const length = topCategories.length
        let newIndex = 0
        if (index > (length - 1)) newIndex = length - 1;
        else if (index >= 0) newIndex = index + 1;
        return newIndex
    }

    return (
        <div>
            <div>Click the Gray Links</div>
            {topCategories.map( (cat, index) => {
                let link = null;
                if (cat) {
                    link =  (
                        <li key={cat._id}>
                            {cat.title} 
                            <MoveButton {...props} index={moveIndexDown(index)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                {"↑"}
                            </MoveButton>   
                            <MoveButton {...props} index={moveIndexUp(index)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                {"↓"}
                            </MoveButton> 
                            <EditButton {...props} id={cat._id} editQuery={EDIT_CAT}/>
                            <DeleteButton {...props}
                                confirmText={`Delete ${cat.title} and all sub-categories?\n`}
                                deleteQuery={DELETE_TOP_CAT}
                                parentId={parentId}
                                categoryId={cat._id}
                             />
                        </li> 
                )}
                return link;
            })}
            <div>Top Category Only</div>
            <div>-dives into the category's sub cats/items</div>
        </div>
    )
}