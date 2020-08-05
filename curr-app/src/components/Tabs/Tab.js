import React, { useState } from 'react'
import style from './Tab.module.css'

const Tab = ({activeTab, label, onClick, ...props}) => {

    const getClassname = () => {
        if (label === activeTab) return `${style.tabListItem} ${style.tabListItemActive}`;
        return style.tabListItem;
    }

    return (
        <li className={getClassname()} onClick={() => onClick(label)}>
            {label}
        </li>
)}

export default Tab;