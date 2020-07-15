
import React, { useState, useEffect } from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import * as studentActions from 'actions/studentActions'
import ArtDropdown from 'components/ArtDropdown'
import StudentAdd from './StudentAdd'
import StudentEdit from './StudentEdit'
import style from './Students.module.css'

class StudentsOld extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        const {schoolun} = this.props;
        // console.log("students: schoolun:", schoolun, schoolid);
        this.SetStudentsFromHTTPRequest(schoolun);
    }
    componentDidUpdate(prevProps) {
        const {schoolun} = this.props;
        // console.log("got here too", schoolun, prevProps.schoolun)
        if (prevProps.schoolun !== schoolun && schoolun !== '' ) {
            this.SetStudentsFromHTTPRequest(schoolun)
        }
    }
    async SetStudentsFromHTTPRequest(schoolun){
        // console.log(students);
        // if (schoolun === '') return []
        let students = await studentActions.getStudentsBySchool(schoolun);
        // [schoolStudents] = students.filter(s => s.schoolun === schoolun).map(s => s.students)
        if (!students) return []
        // console.log("schoolstudents", schoolStudents)
        this.setState( {students} );
    }
    render() {
        const {students} = this.state
        const { arts } = this.props
        // console.log("test:", this.props)
        return (
            <div className={style.studentsDisplay}>
               <StudentSidemenu {...this.props} arts={arts} students={students}/> 
                
            </div>
            
        )
    }
}

function Students({schoolun, arts, ...props}) {
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

    if (loading) return (<p> Loading...</p>)
    return (
        <div className={style.studentsDisplay}>
            <StudentSidemenu {...props} arts={arts} students={students} studentClick={handleStudentClick} newClick={handleNewClick}/>
            <StudentInfoDisplay 
                {...props} 
                schoolun={schoolun} 
                selectedStudentId={selectedStudentId} 
                newStudent={newStudent} 
                onStudentUpdate={onStudentUpdate} 
                onNewStudent={onNewStudent}
            />
        </div>
    )
}

const StudentSidemenu = ({arts=[], students, studentClick, newClick,  ...props}) => (
    <div className={style.sideMenu}>
        <ArtDropdown {...props} className={style.artDropDown} arts={['All', ...arts]} defaultArt={'All'} />
        <button className={style.addStudent} onClick={() => newClick()}>Add New Student</button>
        <ul className={style.studentList}>
            {students.map((s) => {
                return (
                    <li className={style.studentListItem} key={s._id} onClick={()=>studentClick(s)}>{s.last_name} {s.first_name}</li>
                )})
            } 
        </ul>
    </div>
)

const StudentInfoDisplay = ({newStudent, selectedStudentId, onStudentUpdate, schoolun, ...props}) => {
    const displayStudentInfo = () => {
        console.log({newStudent, selectedStudentId})
        if (newStudent && selectedStudentId === null) {
            return (<StudentAdd {...props} schoolun={schoolun} onNewStudent={props.onNewStudent} />)
        }
        else if(!newStudent && selectedStudentId !== null) {
            return (<StudentEdit studentId={selectedStudentId} onStudentUpdate={onStudentUpdate}/>)
        }
    }
    return (
        <div className={style.studentInfoDisplay}>
            {displayStudentInfo()}
        </div>
    )
}

export default Students