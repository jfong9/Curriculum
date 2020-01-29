
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
        const {schoolun} = this.props;
        console.log("students",this.props);
        let students = this.GetStudentsFromHTTPRequest(schoolun);
        this.setState( {students} );
    }
    componentDidUpdate(prevProps, prevState) {
        const {schoolun, match:{params} } = this.props;
        if (prevProps.schoolun !== schoolun && schoolun !== '' ) {
            let students = this.GetStudentsFromHTTPRequest(schoolun)
            this.setState( {students})
        }
    }
    GetStudentsFromHTTPRequest(schoolun){
        if (schoolun === '') return []
        let [schoolStudents] = students.filter(s => s.schoolun === schoolun).map(s => s.students)
        if (!schoolStudents) return []
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