import React, { useState } from 'react'
import { GET_CURRICULUM } from 'actions/curriculumActions'
import { useQuery } from '@apollo/react-hooks'
import style from './Students.module.css'

const  TopCatDropDown = ({schoolId, art, onSelect}) => {
    const [ selectedCat, setCat ] = useState("");
    const { loading, error, data} = useQuery(GET_CURRICULUM, {
        variables: {
            "input": {
                "schoolId": schoolId,
                "art": art
            }
        }
    })
    
    const handleChange =(e) => {
        const { value } = e.target;
        setCat(value);
        console.log({value});
        onSelect(value);
    }
    if (loading) return null;
    if (error) return `Something went wrong: ${error}`;

    const { topCategories } = data.curriculum;
    return (
        <select className={style.topCatSelect} value={selectedCat} onChange={handleChange}>
            <option className={style.topCatOption} key="None" value="None">None</option>
            {topCategories.map( (cat, index) => <option className={style.topCatOption} key={index} value={cat._id}>{cat.title}</option>)}
        </select>
    )
}

export default TopCatDropDown;