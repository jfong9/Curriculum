
import React from 'react'
import {Link, Route, Switch} from 'react-router-dom'
import students from 'database/students'

class Students extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        const {schoolid} = this.props;
        console.log("students",this.props);
        let students = this.GetStudentsFromHTTPRequest(schoolid);
        this.setState( {students} );
    }
    componentDidUpdate(prevProps, prevState) {
        const {schoolid, match:{params} } = this.props;
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            let students = this.GetStudentsFromHTTPRequest(schoolid)
            this.setState( {students})
        }
    }
    GetStudentsFromHTTPRequest(schoolid){
        if (schoolid === '') return []
        let [schoolStudents] = students.filter(s => s.schoolid === schoolid).map(s => s.students)
        return schoolStudents;
    }
    render() {
        const {students} = this.state
        return (
            <div>
                <Link to={{pathname:'Students/add', state:{test: 'hello'}}}>
                    <button>Add New Student</button>
                </Link>
                <div>Delete Student</div>
                <ul>
                    {students.map((s) => {
                        return (<Link key={s.id} to={{pathname:'Students/edit', state: {id: s.id}}}>
                                    <li key={s.id}> {s.name}</li>
                                </Link>)
                        })
                    } 
                </ul>
            </div>
            
        )
    }
}

export default Students