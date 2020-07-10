import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_ALL_CATS } from 'actions/curriculumActions'
import style from './DisplayCategories.module.css'
import { CREATE_CAT, CREATE_ITEM, DELETE_CAT, DELETE_ITEM,
        EDIT_CAT, EDIT_CAT_ITEM, MOVE_CAT, MOVE_ITEM, 
        MOVE_CAT_ARCH, MOVE_ITEM_ARCH,
        ARCHIVE_CAT, ARCHIVE_ITEM, UNARCHIVE_CAT, UNARCHIVE_ITEM  } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import EditButton from 'components/Buttons/Edit'
import CreateButton from 'components/Buttons/Create'
import ArchiveButton from 'components/Buttons/Archive'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import Bullet from './Bullet'

export default function DisplayCategories({selectedCategory}) {
    const [catMap, setMap] = useState(new Map()) 
    // const { loading, error, data } = useQuery(GET_ALL_CATS, {
    //     variables: {"input": selectedCategory},
    // });

    //used lazyquery instead of regular query to avoid apollographql error: can't perform react state update on unmounted warning
    const [getCats, { loading, error, data }] = useLazyQuery(GET_ALL_CATS, {
        variables: {"input": selectedCategory},
    });

    let isMounted = true;
    useEffect( () => {
        if (isMounted) {
            getCats();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) return null;
    if (error) return `Something went wrong: ${error}`;
    if (!data) return null;
    
    const categories = data.getAllCategoryElements;
    if (!catMap.has(selectedCategory)) {
        catMap.clear();
    }

    for (const cat of categories) {
        catMap.set(cat._id, cat);
    }

    let topCategory = categories[0];
    if (topCategory._id !== selectedCategory) {
        return "Top category mismatch. Contact host.";
    } 

    const FormattedCategories = () => ( 
        <React.Fragment>
            <Category
                key={topCategory._id}
                titleClass={style.topCatTitle}
                category={topCategory}
                catMap={catMap}
                selectedCategory={selectedCategory}
            >
                <div className={style.topTitleButtons}>
                    <CreateButtons parentId={topCategory._id} refetchInput={{"input": selectedCategory}} refetchQuery={GET_ALL_CATS}/> 
                </div>
            </Category>
        </React.Fragment>
    )

    return (
        <div className={style.displayCategories}>
            <FormattedCategories/>
        </div>
    )
}


const Category = ({category, parentId, catMap, titleClass, itemClass, selectedCategory, archiveTree, ...props}) => (
    <ul key={category._id} className={style.subCatList}>
        <div key={category._id} className={style.subTitleContainer}>
        <CategoryTitle
            {...props}
            className={titleClass} 
            title={category.title}
        />
        </div>
        {category.currentItems.map( (item, index) => (
            <li key={item._id} className={style.catItemContainer}>
                <CategoryItem 
                    {...props}
                    className={archiveTree === true ? `${style.catItem} ${style.unarchivedArchive}` : `${style.catItem}`} 
                    title={item.title}
                >
                <div className={style.buttons}>
                    <CategoryButtons
                        id={item._id}
                        index={index}
                        length={category.currentItems.length}
                        parentId={category._id}
                        moveQuery={MOVE_ITEM}
                        editQuery={EDIT_CAT_ITEM}
                    />
                    <ArchiveButton 
                        confirmText={`Archive ${item.title}?\n`}
                        archiveQuery={ARCHIVE_ITEM}
                        parentId={category._id}
                        childId={item._id}
                        triggerText={"A"}
                    />
                    <DeleteButton 
                        confirmText={`Delete ${item.title}?\n`}
                        deleteQuery={DELETE_ITEM}
                        parentId={parentId}
                        categoryId={item._id}
                        triggerText={"X"}
                    />
                </div>
                </CategoryItem> 
            </li>
        ))}
       {category.archivedItems.map( (item, index) => (
            <li key={item._id} className={style.catItemContainerArchive}>
                <CategoryItem 
                    {...props}
                    className={style.catItemArchive}
                    title={item.title}
                    id={item._id}
                >
                <div className={style.buttons}>
                    <CategoryButtons
                        id={item._id}
                        index={index}
                        length={category.currentItems.length}
                        parentId={category._id}
                        moveQuery={MOVE_ITEM_ARCH}
                        editQuery={EDIT_CAT_ITEM}
                    />             
                    <ArchiveButton 
                        confirmText={`Unarchive ${item.title}?\n`}
                        archiveQuery={UNARCHIVE_ITEM}
                        parentId={category._id}
                        childId={item._id}
                        triggerText={"U"}
                    />
                    <DeleteButton 
                        confirmText={`Delete ${item.title}?\n`}
                        deleteQuery={DELETE_ITEM}
                        parentId={parentId}
                        categoryId={item._id}
                        triggerText={"X"}
                    />
                </div>
                </CategoryItem>
            </li>
     ))}
        {category.currentChildren.map((cat, index) => (
            <Category
                key={cat._id}
                titleClass={archiveTree === true ? `${style.subTitle} ${style.unarchivedArchive}` : `${style.subTitle}`} 
                category={catMap.get(cat._id)} 
                catMap={catMap}
                selectedCategory={selectedCategory}
                archiveTree={archiveTree}
            >
                <div className={style.buttons}>
                <CategoryButtons 
                    id={cat._id}
                    index={index}
                    length={category.currentChildren.length}
                    parentId={category._id}
                    moveQuery={MOVE_CAT}
                    editQuery={EDIT_CAT}
                />
                <CreateButtons parentId={cat._id} refetchInput={{"input": selectedCategory}} refetchQuery={GET_ALL_CATS}/> 
                <ArchiveButton 
                    confirmText={`Archive ${cat.title}?\n`}
                    archiveQuery={ARCHIVE_CAT}
                    parentId={category._id}
                    childId={cat._id}
                    triggerText={"A"}
                />
                <DeleteButton 
                    confirmText={`Delete ${cat.title} and all sub-categories?\n`}
                    deleteQuery={DELETE_CAT}
                    parentId={category._id}
                    categoryId={cat._id}
                />
                </div>
            </Category>
        ))}
       {category.archivedChildren.map((cat, index) => (
            <Category 
                key={cat._id}
                category={catMap.get(cat._id)} 
                parentId={category._id} 
                catMap={catMap}
                titleClass={style.subTitleContainerArchive} 
                selectedCategory={selectedCategory}
                archiveTree={true}
            >
                <div className={style.buttons}>
                    <CategoryButtons 
                        id={cat._id}
                        index={index}
                        length={category.archivedChildren.length}
                        parentId={category._id}
                        moveQuery={MOVE_CAT_ARCH}
                        editQuery={EDIT_CAT}
                    />
                    <ArchiveButton 
                        confirmText={`Unarchive ${cat.title}?\n`}
                        archiveQuery={UNARCHIVE_CAT}
                        parentId={category._id}
                        childId={cat._id}
                        triggerText={"U"}
                    />
                    <DeleteButton 
                        confirmText={`Delete ${cat.title} and all sub-categories?\n`}
                        deleteQuery={DELETE_CAT}
                        parentId={category._id}
                        categoryId={cat._id}
                    />
                </div>
            </Category>
        ))}
    </ul>
)

const CategoryItem = ({title, className, ...props}) => (
    <React.Fragment>
        <div className={className}>
            <Bullet/>
            {title}
            {props.children}
        </div>
    </React.Fragment>
)


const CategoryTitle = ({title, className, ...props}) => {
    // console.log("CatTitle:", parentId, length);
    return (
        <React.Fragment>
            <label className={className}>
                {title}
            </label>
            {props.children}
        </React.Fragment>
)}

const CategoryButtons = ({id, index, length, parentId, moveQuery, editQuery, style}) => (
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

const CreateButtons = (props) => (
    <React.Fragment>
        <CreateButton 
            {...props}
            query={CREATE_CAT}
            triggerText={"+C"}
        />
        <CreateButton 
            {...props}
            query={CREATE_ITEM}
            triggerText={"+i"}
        />   
    </React.Fragment>
)