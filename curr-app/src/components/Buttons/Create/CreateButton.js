import React, { useRef } from 'react'
import { InputContainer } from 'utils/Modal/Input/InputContainer'
import { useMutation } from '@apollo/react-hooks'
import styles from '../buttons.module.css'

export default function CreateButton( {parentId, query, refetchInput, refetchQuery, className, triggerText="+", ...props}) {
    const [createCategory, { data: createCatData }] = useMutation(query)
    const modalInput = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault(event);
        // console.log(event.target.title.value, curricData, queryInput);
        runCreateCategoryMutation(event.target.title.value)
        modalInput.current.closeModal()
    }

    const runCreateCategoryMutation = async ( title ) => {
        const input = {
            "input": { 
                "parentId": parentId,
                "title": title
            }
        }
        createCategory({ 
            variables: input,
            refetchQueries: [{
                query: refetchQuery,
                variables: refetchInput,
            }]
        })
    }
    return (
        <InputContainer className={styles.modalTrigger} triggerText={triggerText} onSubmit={onSubmit} ref={modalInput} />
    )
}