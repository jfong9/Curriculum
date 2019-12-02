"use strict"

import React from 'react';

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        const { student = this.getBlankStudent(),
                editMode } = props;
        console.log("StudentForm ctor", props, "states:", this.props.location)
        this.state = { 
            student, 
            formChanged: false,
            editMode: editMode};

        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    getBlankStudent() {
        return {
                name: '',
                email:'',
                phone:'',
                address:'',
                city:'',
                zip:''
            } 
    }

    handleEditClick = (event) => {
        event.preventDefault();
        this.setState( {editMode: true})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { student } = this.state;
        const { handleSubmit } = this.props;

        handleSubmit(student);
        this.setState( {editMode: false})
        // let blankStudent = this.getBlankStudent();
        // console.log("blank", blankStudent)
        // this.setState( {student: {
        //         name: '',
        //         email:'',
        //         phone:'',
        //         address:'',
        //         city:'',
        //         zip:''
        //     } })

    }

    componentDidUpdate(prevProps) {
        if (prevProps.editMode !== this.props.editMode)
        {
            console.log("student form updated", this.props.editMode)
            this.setState({editMode: this.props.editMode})
        }

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
    render() {
        const { student: { name, email, phone, address, city, zip }, editMode, formChanged} = this.state;
        const { submitText="Add", editOption} = this.props;
        let editButton = null;
        if (editOption) {
            editButton = (<button disabled={!editOption} onClick={this.handleEditClick}>Edit</button>)
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: 
                    <input type='text' name='name' value={name} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Email: 
                    <input type='text' name='email' value={email} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Phone: 
                    <input type='text' name='phone' value={phone} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Address: 
                    <input type='text' name='address' value={address} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    City: 
                    <input type='text' name='city' value={city} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <label>
                    Zip: 
                    <input type='text' name='zip' value={zip} disabled={!editMode} onChange={this.handleChange}/>
                </label>
                <br/>
                <input type='submit' value={submitText}/>
                <br/>
                {editButton}
            </form>
        )
    }
}

export default StudentForm