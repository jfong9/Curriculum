import React from 'react'
import StudentAdd from './StudentAdd'
import StudentEdit from './StudentEdit'
import style from './Students.module.css'

const StudentInfoDisplay = ({newStudent, selectedStudentId, onStudentUpdate, schoolun, ...props}) => {
    const displayStudentInfo = () => {
        console.log({newStudent, selectedStudentId})
        if (newStudent && selectedStudentId === null) {
            return (<StudentAdd {...props} schoolun={schoolun} onNewStudent={props.onNewStudent} />)
        }
        else if(!newStudent && selectedStudentId !== null) {
            return (<StudentEdit {...props} studentId={selectedStudentId} onStudentUpdate={onStudentUpdate}/>)
        }
    }
    return (
        <div className={style.studentInfoDisplay}>
            {displayStudentInfo()}
        </div>
    )
}

export default StudentInfoDisplay;