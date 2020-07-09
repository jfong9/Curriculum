import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { GET_ALL_CATS } from 'actions/curriculumActions'
import style from './DisplayCategories.module.css'
import { EDIT_CAT, EDIT_CAT_ITEM, MOVE_CAT, MOVE_ITEM, DELETE_CAT, DELETE_ITEM } from 'actions/commonActions'
import DeleteButton from 'components/Buttons/Delete'
import EditButton from 'components/Buttons/Edit'
import CreateButton from 'components/Buttons/Create'
import MoveButton, {moveIndexDown, moveIndexUp} from 'components/Buttons/Move/MoveButton'
import { CREATE_CAT, CREATE_ITEM } from '../../actions/commonActions'

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
            <label className={style.topCatTitle}>
                {topCategory.title}
            </label>
            <CreateButtons parentId={topCategory._id} refetchInput={{"input": selectedCategory}} refetchQuery={GET_ALL_CATS}/> 
            {topCategory.currentChildren.map((cat, index) => (
                <Category 
                    key={cat._id}    
                    category={catMap.get(cat._id)} 
                    index={index} 
                    length={topCategory.currentChildren.length}
                    parentId={topCategory._id} 
                    catMap={catMap}
                    selectedCategory={selectedCategory}/>
            ))} 
        </React.Fragment>
    )

    return (
        <div className={style.displayCategories}>
            <FormattedCategories/>
        </div>
    )
}


const Category = ({category, index, length, parentId, catMap, titleClass, selectedCategory}) => (
    <ul key={category._id} className={style.subCatList}>
        <CategoryTitle
            className={titleClass} 
            id={category._id}
            index={index}
            title={category.title}
            parentId={parentId}
            length={length}
            selectedCategory={selectedCategory}
        />
        {category.currentItems.map( (item, index) => (
            <li key={item._id} className={style.catItemContainer}>
                <CategoryItem 
                    id={item._id}
                    title={item.title}
                    parentId={category._id}
                    index={index}
                    length={length}
                    selectedCategory={selectedCategory}
                /> 
            </li>
        ))}
        {category.archivedItems.map( (item, index) => (
            <li key={item._id} className={style.catItemContainerArchive}>
                <CategoryItem 
                    id={item._id}
                    title={item.title}
                    parentId={category._id}
                    index={index}
                    length={length}
                    selectedCategory={selectedCategory}
                /> 
            </li>
        ))}
        {category.currentChildren.map((cat, index) => (
            <Category
                titleClass={style.subTitleContainer} 
                key={cat._id}
                category={catMap.get(cat._id)} 
                index={index} 
                length={category.currentChildren.length}
                parentId={category._id} 
                catMap={catMap}
                selectedCategory={selectedCategory}
            />
        ))}
        {category.archivedChildren.map((cat, index) => (
            <Category 
                titleClass={style.subTitleContainerArchive} 
                key={cat._id}
                category={catMap.get(cat._id)} 
                index={index} 
                length={category.currentChildren.length}
                parentId={category._id} 
                catMap={catMap}
                selectedCategory={selectedCategory}
            />
        ))}
    </ul>
)

const CategoryItem = ({id, title, index, length, parentId, selectedCategory}) => (
    <React.Fragment>
    <div className={style.catItem}>
        <div className={style.bullet}/>
        {title}
        <div className={style.buttons}>
            <CategoryButtons
                id={id}
                index={index}
                title={title}
                length={length}
                parentId={parentId}
                moveQuery={MOVE_ITEM}
                editQuery={EDIT_CAT_ITEM}
                selectedCategory={selectedCategory}
            />
            <DeleteButton 
                confirmText={`Delete ${title}?\n`}
                deleteQuery={DELETE_ITEM}
                parentId={parentId}
                categoryId={id}
                triggerText={"X"}
            />
        </div>
    </div>
    </React.Fragment>
)

const CategoryTitle = ({id, index, parentId, title, length, selectedCategory, className, ...props}) => {
    // console.log("CatTitle:", parentId, length);
    return (
    <div className={className}>
        <label className={style.subTitle}>
            {title}
        </label>
        <div className={style.buttons}>
            <CategoryButtons 
                id={id}
                title={title}
                index={index}
                length={length}
                parentId={parentId}
                moveQuery={MOVE_CAT}
                editQuery={EDIT_CAT}
                createQuery={CREATE_CAT}
                selectedCategory={selectedCategory}
            />
            <CreateButtons parentId={id} refetchInput={{"input": selectedCategory}} refetchQuery={GET_ALL_CATS}/> 
            <DeleteButton 
                confirmText={`Delete ${title} and all sub-categories?\n`}
                deleteQuery={DELETE_CAT}
                parentId={parentId}
                categoryId={id}
            />
        </div>
    </div>
)}

const CategoryButtons = ({id, index, length, parentId, moveQuery, editQuery, style}) => (
    <React.Fragment>
        <MoveButton style={style} indexFunc={() => moveIndexDown(index, length)} childId={id} parentId={parentId} moveQuery={moveQuery}>
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