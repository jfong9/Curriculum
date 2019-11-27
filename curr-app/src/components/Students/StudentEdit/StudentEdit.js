import React from 'react'
import StudentForm from 'components/Students/StudentForm'


class StudentEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = { editMode: false }
        console.log("StudentEdit ctor", this.props.location.state)
    }

    componentDidMount() {
        console.log("studentForm", this.props.location.state)
    }
    

    handleSubmit = (student) => {
        console.log("student edit submit")
        this.setState({editMode:false})
    }
    render() {
        const {editMode} = this.state;
        console.log("student edit render", editMode)
        return (
            <div>
                <StudentForm handleSubmit={this.handleSubmit} editMode={editMode} editOption={true} submitText='Update'/>
            </div>
        )
    }
}

export default StudentEdit 