import React, { useEffect, useState } from 'react'
import { GET_ALL_CATS } from 'actions/curriculumActions'
import { UPDATE_STATUS } from 'actions/studentCurriculumActions'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import CategoryTitle from 'components/CategoryTitle/CategoryTitle'
import style from './DisplayStudentCategories.module.css'
import CategoryItem from '../CategoryItem/CategoryItem'

const DisplayStudentCategories = ({studentCurricId, selectedCategoryId, currentIds, hiddenIds, topCatIds, statusMap}) => {
    const [catMap, setMap] = useState(new Map()) 

    const [getCats, { loading, error, data }] = useLazyQuery(GET_ALL_CATS, {
        variables: {"input": selectedCategoryId},
    });

    const [updateStatus] = useMutation(UPDATE_STATUS)
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

    const allCategories = data.getAllCategoryElements;
    if (!catMap.has(selectedCategoryId)) {
        catMap.clear();
    } 

    for (const cat of allCategories) {
        catMap.set(cat._id, cat)
    }

    let topCategory;
    if (allCategories.length > 0){
        topCategory = allCategories[0];
        if (topCategory._id !== selectedCategoryId) {
            return "Top category mismatch. Contact host.";
        } 
    } else {
        return "Top category not defined";
    }
    const idFound = (id) => {
        return currentIds.has(id) || hiddenIds.has(id) || topCatIds.has(id) 
    }

    const getStatus = (id) => {
        return statusMap.get(id);
        // return (
        //     <label className={style.status}>{statusMap.get(id)}</label>
        //     )
    }

    const handleStatusChange = (id, collection) => {
        return function(value) {
            const status = value;
            statusMap.set(id, status)
            updateStatus({
                variables: {
                    "input": {
                        "id": studentCurricId,
                        "categoryId": id,
                        "collection": collection,
                        "status": status
                    }
                }
            })
        }
    }
    const topCategoryStatus = ["In Progress", "Ready to Test", "Passed"]
    const itemStatus = ["Needs Work", "Mediocre", "Average", "Good", "Excellent"]
    return (
        <React.Fragment>
            <div className={style.displayCategories}>
                <Category 
                    key={topCategory._id}
                    titleClass={style.topCatTitle}
                    category={topCategory}
                    catMap={catMap}
                    selectedCategory={selectedCategoryId}
                    itemStatus={itemStatus}
                    handleStatusChange={handleStatusChange}
                    idFound={idFound}
                    getStatus={getStatus}
                >
                    <StudentStatusDropDown 
                        defaultStatus={getStatus(topCategory._id)} 
                        statusOptions={topCategoryStatus} 
                        handleChange={handleStatusChange(topCategory._id, "topCategories")}/>
                    <button className={style.status}>Archive</button>
                </Category>
            </div>
        </React.Fragment>
    )
}

const StudentStatusDropDown = ({defaultStatus="", statusOptions=[], handleChange=()=>{}}) => {
    const [value, setValue] = useState(!statusOptions.includes(defaultStatus) ? 'DEFAULT' : defaultStatus);
    const onChange = (e) =>{
        setValue(e.target.value)
        handleChange(e.target.value);
    }
    const onClear = () =>{
        setValue('DEFAULT')
        handleChange("");
    }

    return (
        <React.Fragment>
            <select className={style.status} value={value} onChange={onChange}>
                <option key='Default' value='DEFAULT' hidden disabled>{defaultStatus === "" ? 'Select a status...' : defaultStatus}</option>
                {statusOptions.map( (status, index) => <option key={index} value={status}>{status}</option>)}
            </select>
            <button className={style.statusClear} onClick={onClear}>x</button>
        </React.Fragment>
    )
}

const Category = ({category, parentId, catMap, titleClass, itemClass, itemStatus, idFound, getStatus, handleStatusChange, ...props}) => {
    if (!idFound(category._id)) return null;
    return (
        <ul key={category._id} className={style.subCatList}>
            <div key={category._id} className={style.subTitleContainer}>
                {
                    idFound(category._id) &&
                    <CategoryTitle
                        {...props}
                        className={titleClass}
                        title={category.title}
                    >
                    </CategoryTitle>
                }
            </div>
            <CategoryItems
                itemList={[...category.currentItems, ...category.archivedItems]}
                categoryId={category._id}
                listStyle={style.catItemContainer}
                itemStyle={style.catItem}
                itemStatus={itemStatus}
                handleStatusChange={handleStatusChange}
                idFound={idFound}
                getStatus={getStatus}
            />
            {
                [...category.currentChildren, ...category.archivedChildren].map((cat, index) => (
                    <Category
                        key={cat._id}
                        category={catMap.get(cat._id)}
                        parentId={category._id}
                        catMap={catMap}
                        titleClass={style.subTitle}
                        itemClass={itemClass}
                        itemStatus={itemStatus}
                        handleStatusChange={handleStatusChange}
                        idFound={idFound}
                        getStatus={getStatus}
                    >
                    </Category>
            ))}
        </ul>
        
    )
}

const CategoryItems = ({categoryId, listStyle, itemList, itemStyle, itemStatus, idFound, getStatus, handleStatusChange}) => {
    return (
        <React.Fragment>
            {itemList && itemList.map( (item, index) => (
                idFound(item._id) &&
                <li key={item._id} className={listStyle}>
                    <CategoryItem
                        className={itemStyle}
                        title={item.title}
                    >
                    <StudentStatusDropDown 
                        defaultStatus={getStatus(item._id)}
                        statusOptions={itemStatus} 
                        handleChange={handleStatusChange(item._id, "currentItems")}/> 
                    </CategoryItem>
                </li>
            ))}
        </React.Fragment>
    )
}
export default DisplayStudentCategories;