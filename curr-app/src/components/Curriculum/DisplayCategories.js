import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { GET_ALL_CATS } from 'actions/curriculumActions'
import style from './DisplayCategories.module.css'
import buttonStyle from 'components/Buttons/buttons.module.css'
import { CREATE_CAT, CREATE_ITEM, DELETE_CAT, 
        EDIT_CAT, MOVE_CAT, MOVE_ITEM, 
        MOVE_CAT_ARCH, MOVE_ITEM_ARCH,
        ARCHIVE_CAT, ARCHIVE_ITEM, UNARCHIVE_CAT, UNARCHIVE_ITEM  } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import CreateButton from 'components/Buttons/Create'
import ArchiveButton from 'components/Buttons/Archive'
import CategoryItems from './CategoryItems'
import CategoryButtons from './CategoryButtons'
import CategoryTitle from 'components/CategoryTitle/CategoryTitle'
import { runDeleteMutation } from './graphQLHelper'

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
    
    console.log({data})
    const categories = data.getAllCategoryElements;
    if (!catMap.has(selectedCategory)) {
        catMap.clear();
    }

    for (const cat of categories) {
        catMap.set(cat._id, cat);
    }

    let topCategory;
    if (categories.length > 0) {
        topCategory = categories[0];
        if (topCategory._id !== selectedCategory) {
            return "Top category mismatch. Contact host.";
        } 
    } else {
        return "Top category not defined";
    }

    return (
        <div className={style.displayCategories}>
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
        </div>
    )
}

const Category = ({category, parentId, catMap, titleClass, itemClass, selectedCategory, archiveTree, ...props}) => { 
    const [deleteCat] = useMutation(DELETE_CAT)
    return (
        <ul key={category._id} className={style.subCatList}>
            <div key={category._id} className={style.subTitleContainer}>
            <CategoryTitle
                {...props}
                className={titleClass} 
                title={category.title}
            />
            </div>
            <CategoryItems 
                itemList={category.currentItems} 
                categoryId={category._id}
                listStyle={style.catItemContainer}
                itemStyle={archiveTree === true ? `${style.catItem} ${style.unarchivedArchive}` : `${style.catItem}`}
                archiveAction={"Archive"}
                archiveButtonText={"A"}
                archiveQuery={ARCHIVE_ITEM}
                moveQuery={MOVE_ITEM}
            />
            <CategoryItems
                itemList={category.archivedItems}
                categoryId={category._id}
                listStyle={style.catItemContainerArchive}
                itemStyle={style.catItemArchive}
                archiveAction={"Unarchive"}
                archiveButtonText={"U"}
                archiveQuery={UNARCHIVE_ITEM}
                moveQuery={MOVE_ITEM_ARCH}
            />
            {category.currentChildren && category.currentChildren.map((cat, index) => (
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
                        className={buttonStyle.modalTrigger}
                        id={cat._id}
                        index={index}
                        length={category.currentChildren.length}
                        parentId={category._id}
                        moveQuery={MOVE_CAT}
                        editQuery={EDIT_CAT}
                    />
                    { archiveTree !== true &&
                    <CreateButtons parentId={cat._id} refetchInput={{"input": selectedCategory}} refetchQuery={GET_ALL_CATS}/> 
                    }
                    <ArchiveButton 
                        confirmText={`Archive ${catMap.get(cat._id).title}?\n`}
                        archiveQuery={ARCHIVE_CAT}
                        parentId={category._id}
                        childId={cat._id}
                        triggerText={"A"}
                    />
                    <DeleteButton 
                        confirmText={`Delete ${catMap.get(cat._id).title} and all sub-categories?\n`}
                        deleteFunc={()=> {runDeleteMutation(deleteCat, category._id, cat._id)}}
                    />
                    </div>
                </Category>
            ))}
        {category.archivedChildren && category.archivedChildren.map((cat, index) => (
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
                            className={buttonStyle.modalTrigger}
                            id={cat._id}
                            index={index}
                            length={category.archivedChildren.length}
                            parentId={category._id}
                            moveQuery={MOVE_CAT_ARCH}
                            editQuery={EDIT_CAT}
                        />
                        <ArchiveButton 
                            confirmText={`Unarchive ${catMap.get(cat._id).title}?\n`}
                            archiveQuery={UNARCHIVE_CAT}
                            parentId={category._id}
                            childId={cat._id}
                            triggerText={"U"}
                        />
                        <DeleteButton 
                            confirmText={`Delete ${catMap.get(cat._id).title} and all sub-categories?\n`}
                            deleteFunc={()=> {runDeleteMutation(deleteCat, category._id, cat._id)}}
                        />
                    </div>
                </Category>
            ))}
        </ul>
    )
}

const CreateButtons = (props) => (
    <React.Fragment>
        <CreateButton 
            {...props}
            query={CREATE_CAT}
            triggerText={"C"}
        />
        <CreateButton 
            {...props}
            query={CREATE_ITEM}
            triggerText={"i"}
        />   
    </React.Fragment>
)