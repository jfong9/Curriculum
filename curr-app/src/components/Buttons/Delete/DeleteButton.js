import React, { useRef } from 'react'
import { ConfirmContainer } from 'utils/Modal/Confirm/ConfirmContainer'
import styles from '../buttons.module.css'
import {ReactComponent as Trash } from 'assets/icons/categories/trash.svg'

export default function DeleteButton( {confirmText, deleteFunc, triggerText=<Trash className={styles.icon}/>, className=styles.buttonContainer}) {
    const modalInput = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault(event);
        await runDeleteFunction();
        modalInput.current.closeModal();
    }

    const runDeleteFunction = async () => {
        deleteFunc();
    }

    return (
        <ConfirmContainer 
            className={className}
            confirmText={confirmText + '\nWARNING: this will remove the item/category from all students. \nContinue?'}
            triggerText={triggerText} 
            onSubmit={onSubmit} 
            ref={modalInput}
        />
    );
}