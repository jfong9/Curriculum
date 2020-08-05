import React, { useState, useEffect } from 'react'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'
import style from '../Students.module.css'
import { ReactComponent as FaceIcon } from 'assets/icons/face.svg'

function StudentEdit({onStudentUpdate, loadedStudent, ...props}) {
    const [editDisabled, setDisabled] = useState(true);
    const [loadStudentFlag, setLoad] = useState(false); 
    const [editStudent, setStudent] = useState(null);

    useEffect(() =>{
        loadStudent();

        return () => {
            setStudent(null);
        }
    }, [loadedStudent])

    const loadStudent = async () => {
        setDisabled(true);
        setLoad(true);
        await setStudent(loadedStudent);
    }

    const handleEditClick = (event) => {
        event.preventDefault();
        if (!editDisabled) {
            setLoad(true)
        }
        setDisabled(!editDisabled)
    }
    
    const buttonsFunc = ({className}) => {
        let editButtonVal = 'Edit'
        if (!editDisabled) {
            editButtonVal = 'Cancel'
        }
        return  (
            <React.Fragment>
                <button  className={className} type="button" onClick={handleEditClick}>{editButtonVal}</button>
            </React.Fragment> 
        ) 
    }
    
    const handleSubmit = async (student) => {
        setDisabled(true);
        let success = await studentActions.updateStudent(student)
        if (success) {
            console.log("update success:", success) 
            setStudent(student)
            onStudentUpdate(student);
        }
        else {
            setLoad(true)
        }
    }
    const studentLoaded = () => {
        setLoad(false);
    }

    const renderIcon = ({className}) => {
        return (
        <FaceIcon className={className}/>
        );
    }

    if (!editStudent) return null;
    return (
        <div className={style.studentEdit}>
            <StudentForm 
                {...props}
                Buttons={buttonsFunc}
                student={editStudent} 
                loadStudent={loadStudentFlag} 
                studentLoaded={studentLoaded} 
                handleSubmit={handleSubmit} 
                editDisabled={editDisabled} 
                submitText='Update'
                Icon={renderIcon}/>
        </div>
    )
}

export default StudentEdit