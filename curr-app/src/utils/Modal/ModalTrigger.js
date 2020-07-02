"use strict"
import modalStyle from './Modal.module.css'
import React, { useState } from 'react'

const ModalTrigger = ({triggerText, buttonRef, showModal, className}) => {
    return (
        <button 
            ref={buttonRef} 
            onClick={showModal} 
            className={className} 
        >
                {triggerText}
        </button>
    )
}

export default ModalTrigger