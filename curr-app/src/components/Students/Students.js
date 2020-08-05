import React, { useState, useEffect } from 'react'
import * as studentActions from 'actions/studentActions'
import style from './Students.module.css'
import StudentSidemenu from './StudentSidemenu'
import StudentInfoDisplay from './StudentInfoDisplay'

function Students({schoolun, ...props}) {
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStudent, setNew] = useState(true);
   
    useEffect(() => {
        getStudents(schoolun);
        return resetDisplay; 
    }, [schoolun])

    const resetDisplay = () => {
        setNew(true);
        setSelected(null)
        setStudents([])
    }
    const getStudents = async (schoolun) => {

        console.log({schoolun})
        let students = await studentActions.getStudentsBySchool(schoolun);
        setStudents(students);
        setLoading(false);
    }
    
    const handleStudentClick = (student) => {
        setSelected(student._id);
        setNew(false);
    }

    const handleNewClick = () => {
        setNew(true);
        setSelected(null);
    }

    const onStudentUpdate = async () => {
        let students = await studentActions.getStudentsBySchool(schoolun);
        setStudents(students);
    }

    const onNewStudent = async (newStudent) => {
        let students = await studentActions.getStudentsBySchool(schoolun);
        setStudents(students);
        setNew(false);
        setSelected(newStudent._id)
    }

    const clearStudentInfo = () => {
        setNew(true);
        setSelected(null);
    }

    const onDelete = (id) => {
        if (id === selectedStudentId) clearStudentInfo();
        getStudents(schoolun);
    }
    if (loading) return (<p> Loading...</p>)
    return (
        <div className={style.studentsDisplay}>
            <StudentSidemenu 
                {...props} 
                students={students} 
                studentClick={handleStudentClick} 
                newClick={handleNewClick}
                onDelete={onDelete}
            />
            <StudentInfoDisplay 
                {...props} 
                schoolun={schoolun} 
                selectedStudentId={selectedStudentId} 
                newStudentFlag={newStudent} 
                onStudentUpdate={onStudentUpdate} 
                onNewStudent={onNewStudent}
            />
        </div>
    )
}





export default Students