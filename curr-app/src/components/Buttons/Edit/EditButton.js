import React, { useRef } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { InputContainer } from 'utils/Modal/Input/InputContainer'
import styles from '../buttons.module.css'

export default function EditButton({id, editQuery, triggerText="E"}) {
    const [editFunction, { data: editData }] = useMutation(editQuery)
    const modalInput = useRef(null)
    const onSubmit = async (event) => {
        event.preventDefault(event);
        let title = event.target.title.value;
        if (title !== "" && title) {
            runEditMutation(title);
        } 
        modalInput.current.closeModal();
    }
    const runEditMutation = async ( title ) => {
        const input = {
            "input": { 
                "id": id,
                "title": title
            }
        }
        editFunction({
            variables: input
        })
    }
    return (
        <InputContainer className={styles.modalTrigger} triggerText={triggerText} onSubmit={onSubmit} ref={modalInput} />
    )
}