import React from 'react'
import EditButton from 'components/Buttons/Edit'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import {ReactComponent as UpArrowIcon } from 'assets/icons/categories/up-arrow.svg'
import {ReactComponent as DownArrowIcon } from 'assets/icons/categories/down-arrow.svg'
import style from './Curriculum.module.css'

const CategoryButtons = ({id, index, length, parentId, moveQuery, editQuery, className}) => (
    <React.Fragment>
        <MoveButton className={className} indexFunc={() => moveIndexDown(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            <UpArrowIcon className={style.icon} />
        </MoveButton>   
        <MoveButton className={className} indexFunc={() => moveIndexUp(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
            <DownArrowIcon className={style.icon} />
        </MoveButton> 
        <EditButton className={className} id={id} editQuery={editQuery}/>
    </React.Fragment>
)

export default CategoryButtons;