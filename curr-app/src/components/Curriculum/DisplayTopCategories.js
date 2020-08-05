import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MOVE_TOP_CAT, DELETE_TOP_CAT } from 'actions/curriculumActions'
import { EDIT_CAT } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import EditButton from 'components/Buttons/Edit'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import style from './Curriculum.module.css'
import { runDeleteMutation } from './graphQLHelper'

import {ReactComponent as UpArrow } from 'assets/icons/categories/up-arrow.svg'
import {ReactComponent as DownArrow } from 'assets/icons/categories/down-arrow.svg'
import {ReactComponent as Trash } from 'assets/icons/categories/trash.svg'
import {ReactComponent as Edit } from 'assets/icons/categories/edit.svg'

export default function DisplayTopCategories({topCategories, parentId, categoryClick, onDelete, ...props}) {
    const [deleteFunction] = useMutation(DELETE_TOP_CAT)
    const deleteTopCat = async (parentId, childId) => {
        runDeleteMutation(deleteFunction, parentId, childId) 
        onDelete(childId);
    }

    return (
        <ul className={style.topCategories}>
            {topCategories.map( (cat, index) => {
                let length = topCategories.length;
                let link = null;
                if (cat) {
                    link =  (
                        <li className={style.topCatListItem} key={cat._id}>
                            <div className={style.catTitle} onClick={() => categoryClick(cat._id)} >
                                {cat.title} 
                            </div>
                            <div className={style.buttons}>
                                <MoveButton {...props} 
                                    className={style.buttonContainer}
                                    indexFunc={() => moveIndexDown(index, length)} 
                                    childId={cat._id} 
                                    parentId={parentId} 
                                    moveQuery={MOVE_TOP_CAT}>
                                    <UpArrow className={style.icon}/>
                                    {/* {"↑"} */}
                                </MoveButton>   
                                <MoveButton {...props} 
                                    className={style.buttonContainer}
                                    indexFunc={() => moveIndexUp(index, length)} 
                                    childId={cat._id} 
                                    parentId={parentId} 
                                    moveQuery={MOVE_TOP_CAT}>
                                    <DownArrow className={style.icon}/>
                                </MoveButton>
                                <EditButton {...props} 
                                    className={style.buttonContainer}
                                    id={cat._id} 
                                    editQuery={EDIT_CAT}
                                    triggerText={<Edit className={style.icon}/>}
                                />
                                <DeleteButton {...props}
                                    title={'Delete THIS'}
                                    className={style.buttonContainer}
                                    confirmText={`Delete ${cat.title} and all sub-categories?\n`}
                                    deleteFunc={() => {deleteTopCat(parentId, cat._id)}}
                                    triggerText={<Trash className={style.icon}/>}
                                />
                            </div>
                        </li> 
                )}
                return link;
            })}
        </ul>
    )
}