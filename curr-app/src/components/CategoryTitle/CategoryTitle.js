import React from 'react'

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

export default CategoryTitle;