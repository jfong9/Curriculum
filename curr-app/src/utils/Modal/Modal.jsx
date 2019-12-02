"use strict"

import React from 'react'
import modalStyle from './Modal.module.css'

const Modal = ({handleOK, handleCancel, show, children}) => {
    const showHideClassName = show ? modalStyle.displayBlock : modalStyle.displayNone
    return (
        <div className={showHideClassName}>
            <div className={modalStyle.modal}>
                <section className={modalStyle.modalMain}>
                    {children}
                    <button onClick={handleOK}>
                        OK                    
                    </button>
                    <button onClick={handleCancel}>
                        Cancel
                    </button>
                </section>
            </div>
        </div>        
    );
}

export default Modal