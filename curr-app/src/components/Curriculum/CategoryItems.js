import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ITEM, EDIT_CAT_ITEM } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import ArchiveButton from 'components/Buttons/Archive'
import CategoryButtons from './CategoryButtons'
import style from './DisplayCategories.module.css'
import Bullet from './Bullet'
import { runDeleteMutation } from './graphQLHelper'

const CategoryItems = ({categoryId, listStyle, itemList, itemStyle, archiveButtonText='A', archiveAction, moveQuery, archiveQuery}) => {
    const [deleteItem] = useMutation(DELETE_ITEM)
    return (
        <React.Fragment>
            {itemList.map( (item, index) => (
                <li key={item._id} className={listStyle}>
                    <CategoryItem 
                        className={itemStyle}
                        title={item.title}
                    >
                        <div className={style.buttons}>
                            <CategoryButtons
                                id={item._id}
                                index={index}
                                length={itemList.length}
                                parentId={categoryId}
                                moveQuery={moveQuery}
                                editQuery={EDIT_CAT_ITEM}
                            />
                            <ArchiveButton 
                                confirmText={`${archiveAction} ${item.title}?\n`}
                                archiveQuery={archiveQuery}
                                parentId={categoryId}
                                childId={item._id}
                                triggerText={archiveButtonText}
                            />
                            <DeleteButton 
                                confirmText={`Delete ${item.title} and all sub-categories?\n`}
                                deleteFunc={()=> {runDeleteMutation(deleteItem, categoryId, item._id)}}
                            />
                        </div>
                    </CategoryItem> 
                </li>
            ))}
        </React.Fragment>
    )
}

const CategoryItem = ({title, className, ...props}) => (
    <React.Fragment>
        <div className={className}>
            <Bullet/>
            {title}
            {props.children}
        </div>
    </React.Fragment>
)

export default CategoryItems;