
import React from 'react'
import students from '../../database/students'

class Students extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        console.log("students",this.props);
        let students = this.GetStudentsFromHTTPRequest(params.schoolid);
        this.setState( {students} );
    }
    componentDidUpdate(prevProps, prevState) {
        const {location, match:{params} } = this.props;
        if (location.pathname !== prevProps.location.pathname) {
            let students = this.GetStudentsFromHTTPRequest(params.schoolid)
            this.setState( {students})
        }
    }
    GetStudentsFromHTTPRequest(schoolid){
        let [schoolStudents] = students.filter(s => s.schoolid === schoolid).map(s => s.students)
        return schoolStudents;
    }
    render() {
        const {students} = this.state
        return (
            <div>
                <div>Add New Student</div>
                <div>Edit Student</div>
                <div>Delete Student</div>
                <ul>
                    {students.map((s) => <li key={s.id}>{s.name}</li>)}
                </ul>
            </div>
        )
    }
}

export default Students