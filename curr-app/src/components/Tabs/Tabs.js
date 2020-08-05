import React, { useState } from 'react'
import Tab from './Tab'
import style from './Tabs.module.css'

const Tabs = ({children}) => {
    const [activeTab, setActiveTab] = useState(null)
    const onClickTab = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className={style.tabs}>
            <ul className={style.tabList}>
                {children.map( (tab) => {
                    const { label } = tab.props;
                    return (
                        <Tab 
                            activeTab={activeTab}
                            key={label}
                            label={label}
                            onClick={onClickTab}
                        />
                    )
                })}
            </ul>
            <div className={style.currentTabContent}>
                {children.map( (tab) => {
                    if (tab.props.label !== activeTab) return undefined;
                    return tab.props.children;
                })}
            </div>
        </div> 
    )
}

export default Tabs;