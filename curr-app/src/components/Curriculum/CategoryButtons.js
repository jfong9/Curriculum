import React from 'react'
import EditButton from 'components/Buttons/Edit'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'

const CategoryButtons = ({id, index, length, parentId, moveQuery, editQuery}) => (
    <React.Fragment>
        <MoveButton indexFunc={() => moveIndexDown(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            {"↑"}
        </MoveButton>   
        <MoveButton indexFunc={() => moveIndexUp(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            {"↓"}
        </MoveButton> 
        <EditButton id={id} editQuery={editQuery} triggerText={"E"}/>
    </React.Fragment>
)

export default CategoryButtons;