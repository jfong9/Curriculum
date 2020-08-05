import React from 'react'
import EditButton from 'components/Buttons/Edit'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import {ReactComponent as UpArrow } from 'assets/icons/categories/up-arrow.svg'

const CategoryButtons = ({id, index, length, parentId, moveQuery, editQuery, className}) => (
    <React.Fragment>
        <MoveButton className={className} indexFunc={() => moveIndexDown(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            {"↑"}
        </MoveButton>   
        <MoveButton className={className} indexFunc={() => moveIndexUp(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            {"↓"}
        </MoveButton> 
        <EditButton id={id} editQuery={editQuery} triggerText={"E"}/>
    </React.Fragment>
)

export default CategoryButtons;