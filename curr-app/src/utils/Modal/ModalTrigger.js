"use strict"
import modalStyle from './Modal.module.css'
import React, { useState } from 'react'

const ModalTrigger = ({triggerText = () =>{}, buttonRef, showModal, className}) => {
    const renderTriggerText = () => {
        if (typeof triggerText === 'function') 
            return triggerText();
        return triggerText;
    }
    return (
        <button 
            ref={buttonRef} 
            onClick={showModal} 
            className={className} 
        >
                {renderTriggerText()}
        </button>
    )
}

export default ModalTrigger