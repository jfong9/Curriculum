
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import * as studentActions from 'actions/studentActions'
// import students from 'database/students'

class Students extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        const {schoolid} = this.props;
        console.log("students: schoolid:", schoolid);
        this.SetStudentsFromHTTPRequest(schoolid);
    }
    componentDidUpdate(prevProps) {
        const {schoolid} = this.props;
        // console.log("got here too", schoolid, prevProps.schoolid)
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            this.SetStudentsFromHTTPRequest(schoolid)
        }
    }
    async SetStudentsFromHTTPRequest(schoolid){
        // console.log(students);
        // if (schoolid === '') return []
        let students = await studentActions.getStudentsBySchool(schoolid);
        // [schoolStudents] = students.filter(s => s.schoolun === schoolid).map(s => s.students)
        if (!students) return []
        // console.log("schoolstudents", schoolStudents)
        this.setState( {students} );
    }
    render() {
        const {students} = this.state
        const {mainProps} = this.props
        console.log("test:", mainProps)
        return (
            <div>
                <Link to={{pathname:'Students/add'}}>
                    <button>Add New Student</button>
                </Link>
                <ul>
                    {students.map((s) => {
                        return (<Link key={s._id} to={{pathname:'Students/edit', state: {id: s._id}}}>
                                    <li key={s._id}>{s.last_name} {s.first_name}</li>
                                </Link>)
                        })
                    } 
                </ul>
            </div>
            
        )
    }
}

export default Students