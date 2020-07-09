import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ConfirmContainer } from 'utils/Modal/Confirm/ConfirmContainer'
import styles from '../buttons.module.css'

export default function DeleteButton( {parentId, categoryId, deleteQuery, confirmText, triggerText="X"}) {
    const [deleteFunction, { data: deleteData }] = useMutation(deleteQuery)
    const modalInput = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault(event);
        runDeleteMutation();
        modalInput.current.closeModal();
    }

    const runDeleteMutation = async () => {
        const input = {
            "input": { 
                "parentId": parentId,
                "deleteId": categoryId 
            }
        }
        deleteFunction({
            variables: input
        })
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