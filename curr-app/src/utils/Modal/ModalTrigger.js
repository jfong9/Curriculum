"use strict"
import modalStyle from './Modal.module.css'
import React, { useState } from 'react'

const ModalTrigger = ({triggerText, buttonRef, showModal}) => {
    return (
        <button 
            ref={buttonRef} 
            onClick={showModal} 
            className={modalStyle.modalTrigger} 
        >
                {triggerText}
        </button>
    )
}

export default ModalTrigger