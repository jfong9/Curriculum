import React from 'react'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'

function StudentAdd ({ schoolun, onNewStudent, ...props }) {
    const handleSubmit = async (student) => {
        console.log("student add submit", student, schoolun)
        student = await studentActions.addStudent(student, schoolun);
        if (student) {
            onNewStudent(student);
        }
    }
    return (
        <div>
            <StudentForm {...props} editDisabled={false} submitText={'Add'} handleSubmit={handleSubmit}/>
        </div>
    )
}
export default StudentAdd 