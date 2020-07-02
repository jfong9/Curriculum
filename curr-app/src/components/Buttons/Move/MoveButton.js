import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import styles from '../buttons.module.css'

export default function MoveButton({index, parentId, childId, moveQuery, ...props}) {
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
                            "index": index
                        }
                    },
                }) 
            }
      }>
        {props.children}
      </button>
    
    );
}