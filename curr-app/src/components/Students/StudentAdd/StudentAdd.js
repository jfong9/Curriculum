import React from 'react'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'
import style from '../Students.module.css'
import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg'

function StudentAdd ({ schoolun, onNewStudent, ...props }) {
    const handleSubmit = async (student) => {
        console.log("student add submit", student, schoolun)
        student = await studentActions.addStudent(student, schoolun);
        if (student) {
            onNewStudent(student);
        }
    }
    
    const renderIcon = ({className}) => {
        return (
            <PlusIcon className={className}/>
        );
    }

    return (
        <div className={style.studentAdd}>
            <StudentForm {...props} editDisabled={false} submitText={'Add'} handleSubmit={handleSubmit} Icon={renderIcon}/>
        </div>
    )
}
export default StudentAdd 