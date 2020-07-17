import React, { useState, useEffect } from 'react'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'

function StudentEdit({studentId, onStudentUpdate, ...props}) {
    const [editDisabled, setDisabled] = useState(true);
    const [loadStudentFlag, setLoad] = useState(false); 
    const [editStudent, setStudent] = useState(null);

    useEffect(() =>{
        loadStudent();

        return () => {
            setStudent(null);
        }
    }, [studentId])

    const loadStudent = async () => {
        let newStudent = await studentActions.getStudentById(studentId) 
        console.log({newStudent, studentId})
        setDisabled(true);
        setLoad(true);
        setStudent(newStudent);
    }

    const handleEditClick = (event) => {
        event.preventDefault();
        if (!editDisabled) {
            setLoad(true)
        }
        setDisabled(!editDisabled)
    }
    
    const buttonsFunc = () => {
        let editButtonVal = 'Edit'
        if (!editDisabled) {
            editButtonVal = 'Cancel'
        }
        return  (
            <div>
                <button type="button" onClick={handleEditClick}>{editButtonVal}</button>
            </div>
        ) 
    }
    
    const handleSubmit = async (student) => {
        setDisabled(true);
        let success = await studentActions.updateStudent(student)
        if (success) {
            console.log("update success:", success) 
            setStudent(student)
            onStudentUpdate();
        }
        else {
            setLoad(true)
        }
    }
    const studentLoaded = () => {
        setLoad(false);
    }

    if (!editStudent) return null;
    return (
        <div>
            <StudentForm 
                {...props}
                Buttons={buttonsFunc}
                student={editStudent} 
                loadStudent={loadStudentFlag} 
                studentLoaded={studentLoaded} 
                handleSubmit={handleSubmit} 
                editDisabled={editDisabled} 
                submitText='Update'/>
        </div>
    )
}

export default StudentEdit