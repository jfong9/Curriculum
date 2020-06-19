import React, { useRef } from 'react'
import { GET_CURRICULUM,  CREATE_TOP_CAT } from 'actions/curriculumActions'
import { InputContainer } from 'utils/Modal/Input/InputContainer'
import { useMutation } from '@apollo/react-hooks'

export default function CreateTopCatButton( {curricData, queryInput, ...props}) {
    const [createTopCategory, { data: createCatData }] = useMutation(CREATE_TOP_CAT)
    const modalInput = useRef(null)

    const onSubmit = async (event) => {
        event.preventDefault(event);
        console.log(event.target.title.value, curricData, queryInput);
        runCreateTopCategoryMutation(event.target.title.value)
        modalInput.current.closeModal()
    }

    const runCreateTopCategoryMutation = async ( title ) => {
        const parentId = curricData.curriculum._id;
        const input = {
            "input": { 
                "parentId": parentId,
                "title": title
            }
        }
        createTopCategory({ 
            variables: input,
            refetchQueries: [{
                query: GET_CURRICULUM,
                variables: queryInput
            }]
        })
    }
    return (
        <InputContainer triggerText="Add Top Category" onSubmit={onSubmit} ref={modalInput} />
    )
}
