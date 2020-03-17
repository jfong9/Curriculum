"use strict"

import React from 'react';

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        const { student = this.getBlankStudent()} = props;
        // console.log("StudentForm ctor", props, "states:", this.props.location)
        this.state = { 
            student, 
            formChanged: false};

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    getBlankStudent() {
        return {            
                first_name: '', 
                last_name: '', 
                birthday: '', 
                email: '', 
                phone: '', 
                address: {
                    street: '', 
                    city: '', 
                    zip: ''
                } 
            } 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { student } = this.state;
        const { handleSubmit } = this.props;
        this.setState({formChanged: false})
        handleSubmit(student);
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        const { loadStudent, studentLoaded } = this.props;
        if (loadStudent) {
            studentLoaded();
            this.setState( {student: this.props.student, formChanged: false })
        }
    }

    handleAddressChange = (event) => {
        const { student } = this.state
        const name = event.target.name
        const value = event.target.value;
        this.setState({
            student: {
                ...student,
                address:
                {   
                    ...student.address,
                    [name]: value
                }
            },
            formChanged: true
        })
    }
    handleChange = (event) => {
        const { student } = this.state
        const name = event.target.name
        const value = event.target.value;
        this.setState({ 
            student: {...student, [name]: value},
            formChanged: true
        })
    }

    // buttonsFunc = () => {
    //     const { editOption } = this.props
    //     return  (
    //         <div>
    //             <button disabled={!editOption} onClick={this.handleEditClick}>Edit1</button>
    //             <button onClick={this.handleDeleteClick}>Delete</button>
    //         </div>
    //     ) 
    // }
    render() {
        const { student: { 
                    first_name, 
                    last_name, 
                    birthday, 
                    email, 
                    phone, 
                    address: {
                        street,
                        city,
                        zip
                    }
                }, 
                formChanged,
              } = this.state;
        const { submitText="Add", Buttons= () => null, submitDisabled = false, editDisabled} = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    First name: 
                    <input type='text' name='first_name' value={first_name} disabled={editDisabled} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Last name: 
                    <input type='text' name='last_name' value={last_name} disabled={editDisabled} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Birthdate: 
                    <input type='text' name='birthday' value={birthday} disabled={editDisabled} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Email: 
                    <input type='text' name='email' value={email} disabled={editDisabled} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Phone: 
                    <input type='text' name='phone' value={phone} disabled={editDisabled} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Street: 
                    <input type='text' name='street' value={street} disabled={editDisabled} onChange={this.handleAddressChange}/>
                </label>
                <br/>
                <label>
                    City: 
                    <input type='text' name='city' value={city} disabled={editDisabled} onChange={this.handleAddressChange}/>
                </label>
                <br/>
                <label>
                    Zip: 
                    <input type='text' name='zip' value={zip} disabled={editDisabled} onChange={this.handleAddressChange}/>
                </label>
                <br/>
                <input data-testid='submit-button' type='submit' disabled={(!formChanged || submitDisabled)} value={submitText}/>
                {<Buttons/>}
                <br/>
            </form>
        )
    }
}

export default StudentForm