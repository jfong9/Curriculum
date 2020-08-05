import React, {useState, useEffect} from 'react'
import StudentAdd from './StudentAdd'
import StudentEdit from './StudentEdit'
import StudentCurriculum from './StudentCurriculum'
import * as studentActions from 'actions/studentActions'
import style from './Students.module.css'

const StudentInfoDisplay = ({newStudentFlag, selectedStudentId, onStudentUpdate, schoolun, schoolId, ...props}) => {
    const [loadedStudent, setLoadedStudent] = useState(null)
    useEffect(() =>{
        selectedStudentId && loadStudent(); 

        return () => {
            setLoadedStudent(null);
        }
    }, [selectedStudentId])
   
    const loadStudent = async () =>{
        let student = await studentActions.getStudentById(selectedStudentId) 
        setLoadedStudent(student);
    }

    const onUpdate = (student) => {
        setLoadedStudent(student);
        onStudentUpdate();
    }
    const displayStudentInfo = () => {
        const displayStudentForm = () => {
            if (newStudentFlag && selectedStudentId === null)
                return (<StudentAdd {...props} schoolun={schoolun} onNewStudent={props.onNewStudent} />)
            else if(!newStudentFlag && selectedStudentId !== null) {
                return (<StudentEdit {...props} loadedStudent={loadedStudent} studentId={selectedStudentId} onStudentUpdate={onUpdate}/>)
            }
        }

        return (
            <React.Fragment>
                {displayStudentForm()}
                <StudentCurriculum loadedStudent={loadedStudent} schoolId={schoolId}/>
            </React.Fragment>
        )
    }

    return (
        <div className={style.studentInfoDisplay}>
            {displayStudentInfo()}
            <div className={style.attribution}>
                <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
            </div>
        </div>
    )
}

export default StudentInfoDisplay;