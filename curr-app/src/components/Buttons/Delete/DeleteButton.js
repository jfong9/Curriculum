import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ConfirmContainer } from 'utils/Modal/Confirm/ConfirmContainer'
import styles from '../buttons.module.css'

export default function DeleteButton( {confirmText, deleteFunc, triggerText="X"}) {
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
            className={styles.modalTrigger}
            confirmText={confirmText}
            triggerText={triggerText} 
            onSubmit={onSubmit} 
            ref={modalInput}
        />
    );
}