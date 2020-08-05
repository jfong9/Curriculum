'use strict'
import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { GET_STUDENT_CURR_CURRIC, ADD_TOP_CAT, CLEAR_STUDENT_CURR } from 'actions/studentCurriculumActions'
import DisplayStudentCategories from './DisplayStudentCategories'
import TopCatDropDown from './StudentTopCatDropDown'
import style from './Students.module.css'
import { noSubselectionAllowedMessage } from 'graphql/validation/rules/ScalarLeafs'

export const StudentCurrCurric = ({studentId, schoolId, art}) => {
    const getStudentCurrInput = () => {
        return {  
            "studentId": studentId,
            "art": art
        }
    }
    const [selectedCatId, setCatId] = useState("");
    const [addTopCategory] = useMutation(ADD_TOP_CAT);
    const [clearCurrCurric] = useMutation(CLEAR_STUDENT_CURR);
    const [getStudentCurrCurric, { loading, error, data}] = useLazyQuery(GET_STUDENT_CURR_CURRIC, {
        variables: {"input": getStudentCurrInput()},
    })
    let isMounted = true;
    useEffect( () => {
        if (isMounted) {
            getStudentCurrCurric();
        }
        return () => {
            isMounted = false;
        };
    }, []);
    

    if (loading) return null;
    if (error) return `Something went wrong: ${error}`;
    if (!data) return null;
  

    const onSelect = (topCatId) => {
        setCatId(topCatId);
    }

    const onAddTopCat = () => {
        if (selectedCatId === "") return;
        addTopCategory({
            variables: {
                "input": {
                    "studentCurrInput": getStudentCurrInput(), 
                    "categoryId": selectedCatId,
                }
            },
            refetchQueries: [{
                query: GET_STUDENT_CURR_CURRIC,
                variables: { "input": getStudentCurrInput() }
            }]
        })
    }

    const onClearCurric = () => {
        clearCurrCurric({
            variables: { "input": getStudentCurrInput() }
        })
    }

    const {_id: studentCurricId, topCategories, currentCategories, currentItems, hiddenCategories, hiddenItems } = data.getStudentCurrCurric;
    const topCatIds = new Set([...topCategories.map(obj => obj.id)]);
    const hiddenIds = new Set([...hiddenCategories.map(obj => obj.id), ...hiddenItems.map(obj => obj.id)]);
    const currentIds = new Set([...currentCategories.map(obj=> obj.id), ...currentItems.map(obj => obj.id)]);

    const getStatusMap = (...arrays) => {
        return new Map([].concat(...arrays).map( obj => [obj.id, obj.status]))
    }
    const statusMap = getStatusMap(topCategories, currentCategories, currentItems, hiddenCategories, hiddenItems);
    console.log({studentCurricId});
    return (
        <div className={style.studentCurricContent} >
            <div className={style.studentCurrToolbar}> 
                <TopCatDropDown schoolId={schoolId} art={art} onSelect={onSelect}/>
                <button onClick={onAddTopCat}>add</button>
                <button onClick={onClearCurric}>clear</button>
            </div>
            <div className={style.studentCurrCurric}>
                {
                    topCategories.map( (cat) => 
                        <DisplayStudentCategories 
                            key={cat.id}
                            studentCurricId={studentCurricId} 
                            selectedCategoryId={cat.id} 
                            currentIds={currentIds} 
                            hiddenIds={hiddenIds}
                            topCatIds={topCatIds} 
                            statusMap={statusMap}
                        />
                )}
            </div>
        </div>
    )
}
   

export default StudentCurrCurric;