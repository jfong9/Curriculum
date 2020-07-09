import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import styles from '../buttons.module.css'

export default function MoveButton({indexFunc, parentId, childId, moveQuery, ...props}) {
    const [moveFunction, { data: moveCatData }] = useMutation(moveQuery)
    return (
      <button className={styles.modalTrigger}
        onClick= {
            () => {
                moveFunction({
                    variables: {
                        "input": {
                            "parentId": parentId,
                            "childId": childId,
                            "index": indexFunc()
                        }
                    },
                }) 
            }
      }>
        {props.children}
      </button>
    
    );
}

export function moveIndexDown(index, length) {
    let newIndex = 0
    if (index > length) newIndex = length -1;
    else if (index > 0) newIndex = index - 1;
    return newIndex
}

export function moveIndexUp(index, length) {
    let newIndex = 0
    if (index >= (length - 1)) newIndex = length;
    else if (index >= 0) newIndex = index + 1;
    return newIndex
}