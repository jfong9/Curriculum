import React from 'react'
import StudentForm from 'components/Students/StudentForm'


class StudentAdd extends React.Component {
    constructor(props) {
        super(props)
        
    }

    handleSubmit = (student) => {
        console.log("student add submit")
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <StudentForm handleSubmit={this.handleSubmit} editMode={true} editOption={false} submitText='Add'/>
            </div>
        )
    }
}

export default StudentAdd 