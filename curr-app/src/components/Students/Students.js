
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import * as studentActions from 'actions/studentActions'
import ArtDropdown from 'components/ArtDropdown'
// import students from 'database/students'

class Students extends React.Component {
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
        const arts = this.props.arts ? this.props.arts : []
        // console.log("test:", this.props)
        return (
            <div>
                <ArtDropdown {...this.props} arts={['All', ...arts]} defaultArt={'All'} />
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