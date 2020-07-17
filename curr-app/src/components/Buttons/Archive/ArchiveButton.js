import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ConfirmContainer } from 'utils/Modal/Confirm/ConfirmContainer'
import styles from '../buttons.module.css'

export default function ArchiveButton( {parentId, childId, archiveQuery, confirmText, triggerText="A"}) {
    const [archiveFunction] = useMutation(archiveQuery)
    const modalInput = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault(event);
        runArchiveMutation();
        modalInput.current.closeModal();
    }

    const runArchiveMutation = async () => {
        const input = {
            "input": { 
                "parentId": parentId,
                "childId": childId
            }
        }
        archiveFunction({
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