import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MOVE_TOP_CAT, DELETE_TOP_CAT } from 'actions/curriculumActions'
import { EDIT_CAT } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import EditButton from 'components/Buttons/Edit'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import style from './Curriculum.module.css'
import { runDeleteMutation } from './graphQLHelper'


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
                                <MoveButton {...props} indexFunc={() => moveIndexDown(index, length)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                    {"↑"}
                                </MoveButton>   
                                <MoveButton {...props} indexFunc={() => moveIndexUp(index, length)} childId={cat._id} parentId={parentId} moveQuery={MOVE_TOP_CAT}>
                                    {"↓"}
                                </MoveButton> 
                                <EditButton {...props} id={cat._id} editQuery={EDIT_CAT}/>
                                <DeleteButton {...props}
                                    confirmText={`Delete ${cat.title} and all sub-categories?\n`}
                                    deleteFunc={() => {deleteTopCat(parentId, cat._id)}}
                                />
                            </div>
                        </li> 
                )}
                return link;
            })}
        </ul>
    )
}