import React from 'react'
import { Redirect } from 'react-router-dom'
import StudentForm from 'components/Students/StudentForm'
import * as studentActions from 'actions/studentActions'
import { getStudentsUrl } from 'utils/redirectstrings'

class StudentAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            toStudentsMain: false,
            toStudentEdit: false,
            submitDisabled: false,
            student: {}
        }        
    }

    componentDidUpdate(prevProps) {
        const {schoolid} = this.props;
        if (prevProps.schoolid !== schoolid && schoolid !== '' ) {
            this.setState({toStudentsMain: true})
        }
    }
    handleSubmit = async (student) => {
        const { schoolid } = this.props;
        // console.log("student add submit", student, schoolid)
        student = await studentActions.addStudent(student, schoolid);
        if (student) {
            this.setState({student, submitDisabled: true, toStudentEdit: true});
        }
    }
    componentDidMount() {

    }
    render() {
        const { toStudentsMain, toStudentEdit, student, submitDisabled } = this.state;
        const { match: {params}} = this.props
        if (toStudentsMain) {
            return <Redirect to={getStudentsUrl(params.username)}/>
        }
        else if (toStudentEdit) {
            return <Redirect to={{pathname:getStudentsUrl(params.username)+'/edit', state: {id: student._id}}}/>
        }
        return (
            <div>
                <StudentForm handleSubmit={this.handleSubmit} editDisabled={false} submitDisabled={submitDisabled} submitText='Add'/>
            </div>
        )
    }
}

export default StudentAdd 