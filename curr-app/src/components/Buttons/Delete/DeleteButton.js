import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ConfirmContainer } from 'utils/Modal/Confirm/ConfirmContainer'

export default function DeleteButton( {parentId, categoryId, deleteQuery, confirmText}) {
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
            confirmText={confirmText}
            triggerText="X" 
            onSubmit={onSubmit} 
            ref={modalInput}
        />
    );
}