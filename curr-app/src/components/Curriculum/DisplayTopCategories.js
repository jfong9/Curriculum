import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { MOVE_TOP_CAT, DELETE_TOP_CAT } from 'actions/curriculumActions'
import { EDIT_CAT } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import style from './Curriculum.module.css'
import { runDeleteMutation } from './graphQLHelper'
import CategoryButtons from './CategoryButtons'

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
                                <CategoryButtons
                                    className={style.buttonContainer}
                                    parentId={parentId}
                                    id={cat._id}
                                    index={index}
                                    length={length}
                                    moveQuery={MOVE_TOP_CAT}
                                    editQuery={EDIT_CAT}
                                />
                                <DeleteButton {...props}
                                    title={'Delete THIS'}
                                    className={style.buttonContainer}
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