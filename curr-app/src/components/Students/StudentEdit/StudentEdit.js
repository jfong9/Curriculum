import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'
import { getStudentsUrl } from 'utils/redirectstrings'

class StudentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            editDisabled: true,
            loadStudent: false,
            toStudentsMain: false,
        }
        console.log("StudentEdit ctor", this.props.location.state)
    }

    async componentDidMount() {
        const { id } = this.props.location.state
        let student = await studentActions.getStudentById(id) 
        this.setState({loadStudent: true, student})
    }

    componentDidUpdate(prevProps) {
        const {schoolid, match:{params}} = this.props;
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            this.setState({toStudentsMain: true})
        }
    }

    handleEditClick = (event) => {
        const { editDisabled } = this.state
        event.preventDefault();
        if (!editDisabled) {
            //currently false and switching to true so load back the old data
            this.setState({loadStudent: true})
        }
        this.setState( {editDisabled: !editDisabled })
    }
    
    handleDeleteClick = async (event) => {
        const { student } = this.state;
        let success = await studentActions.deleteStudent(student._id);
        if (success) {
            this.setState({toStudentsMain: true})
        } 
    }
    buttonsFunc = () => {
        const { editDisabled } = this.state
        let editButtonVal = 'Edit'
        if (!editDisabled) {
            editButtonVal = 'Cancel'
        }
        console.log(editDisabled);
        return  (
            <div>
                <button type="button" onClick={this.handleEditClick}>{editButtonVal}</button>
                <button type="button" onClick={this.handleDeleteClick}>Delete</button>
            </div>
        ) 
    }

    studentLoaded = () => {
        this.setState({loadStudent : false});
    }

    handleSubmit = async (student) => {
        this.setState({editDisabled:true})
        console.log("updated student", student)
        let success = await studentActions.updateStudent(student)
        if (success) {
            console.log("update success:", success) 
            this.setState({student})
        }
        else {
            this.setState({loadStudent: true})
        }
    }
    render() {
        const {editDisabled, student, loadStudent, toStudentsMain} = this.state;
        const { match: {params}} = this.props
        if (toStudentsMain) {
            return <Redirect to={getStudentsUrl(params.username)}/>
        }

        return (
            <div>
                <StudentForm Buttons={this.buttonsFunc} student={student} loadStudent={loadStudent} 
                    studentLoaded={this.studentLoaded} handleSubmit={this.handleSubmit} 
                    editDisabled={editDisabled} submitText='Update'/>
            </div>
        )
    }
}


function StudentEditNew({studentId, onStudentUpdate}) {
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
            <StudentForm Buttons={buttonsFunc} student={editStudent} loadStudent={loadStudentFlag} 
                studentLoaded={studentLoaded} handleSubmit={handleSubmit} 
                editDisabled={editDisabled} submitText='Update'/>
        </div>
    )
}

export default StudentEditNew