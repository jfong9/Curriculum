import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import styles from '../buttons.module.css'

export default function MoveButton({indexFunc, parentId, childId, moveQuery, className=styles.buttonContainer, ...props}) {
    const [moveFunction] = useMutation(moveQuery)
    return (
      <button className={className} 
        onClick= {
            async () => {
                try {
                    let index = indexFunc();
                    if (index !== -1) {
                        await moveFunction({
                            variables: {
                                "input": {
                                    "parentId": parentId,
                                    "childId": childId,
                                    "index": index,
                                }
                            },
                        }) 
                    }
                }
                catch (error) {
                    console.log(`${error}`);
                }
            }
      }>
        {props.children}
      </button>
    
    );
}

export function moveIndexDown(index, length) {
    let newIndex = -1 
    if (index > 0 && index <= (length -1)) newIndex = index - 1;
    return newIndex
}

export function moveIndexUp(index, length) {
    let newIndex = -1 
    if (index >= 0 && index < (length - 1)) newIndex = index + 1;
    return newIndex
}