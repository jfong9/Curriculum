import React from 'react'
import Bullet from './Bullet'

const CategoryItem = ({title, className, ...props}) => (
    <React.Fragment>
        <div className={className}>
            <Bullet/>
            {title}
            {props.children}
        </div>
    </React.Fragment>
)

export default CategoryItem;