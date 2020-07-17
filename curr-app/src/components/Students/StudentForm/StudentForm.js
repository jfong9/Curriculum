"use strict"

import React, {useState, useEffect} from 'react';
import style from './StudentForm.module.css'

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        const { student = this.getBlankStudent()} = props;
        this.state = { 
            student, 
            arts: student.arts || [],
            startDates: student.startDates || {},
            formChanged: false};

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
                }, 
                arts: [],
                startDates: {},
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
        console.log("StudentForm Mount:", this.props.student, this.state.student) 
    }
    componentDidUpdate(prevProps) {
        const { loadStudent, studentLoaded, student } = this.props;
        if (loadStudent) {
            console.log("StudentForm LoadStudent", loadStudent, student)
            studentLoaded();
            this.setState({
                student, 
                arts: student.arts || [], 
                startDates: student.startDates || {}, 
                formChanged: false 
            })
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
        const { student, arts } = this.state
        const name = event.target.name
        const value = event.target.value;
        this.setState({ 
            student: {...student, [name]: value},
            formChanged: true
        })
    }

    handleArtChange = (checked, art) => {
        const { arts } = this.state;
        let newArts;
        if (checked) {
            newArts = arts.concat(art);
        }
        else {
            newArts= arts.filter(a => a !== art)
        }
        this.setState({arts: newArts}, () => { this.updateStudentArray("arts", this.state.arts)});
    }

    handleDateChange = (value, art) => {
        const { startDates } = this.state;
        let newDates = {...startDates}
        newDates[art] = value;
        this.setState({startDates: newDates}, () => { this.updateStudentArray("startDates", this.state.startDates)})
    }
    
    updateStudentArray = (key, value) => { 
        const { student } = this.state;
        this.setState({student: {...student, [key]: value}, formChanged: true}, () => console.log(this.state.student, this.state.startDates));
    }

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
                arts,
                startDates,
              } = this.state;
        const { submitText="Add", Buttons= () => null, submitDisabled = false, editDisabled, arts: schoolArts} = this.props;
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
                <div className={style.arts}>
                    {
                        schoolArts.map(art => 
                            <ArtCheckBox 
                                key={art} 
                                art={art}
                                defaultChecked={arts.includes(art)}
                                defaultDate={startDates[art]}
                                disabled={editDisabled} 
                                onArtChange={this.handleArtChange}
                                onDateChange={this.handleDateChange}
                            />)
                    }
                </div>
                <input data-testid='submit-button' type='submit' disabled={(!formChanged || submitDisabled)} value={submitText}/>
                {<Buttons/>}
                <br/>
            </form>
        )
    }
}

const ArtCheckBox = ({checkboxStyle, art, disabled, onArtChange, onDateChange, defaultChecked, defaultDate=""}) => {
    const [checked, setChecked] = useState(defaultChecked);
    const [date, setDate] = useState(defaultDate);

    //happens when user cancels out of the edit form
    useEffect( ()=> {
        setDate(defaultDate);
        setChecked(defaultChecked);
    }, [defaultChecked, defaultDate])

    //handles the local change and pushes the state up to the editForm
    const onCheckChange = (event) => {
        let { checked } = event.target;
        setChecked(checked);
        if (date === "" && checked) {
            let today = new Date().toISOString().slice(0,10)
            setDate(today)
            onDateChange(today, art)
        }
        onArtChange(checked, art);
    }
    
    //handles the local change and pushes the state up to the editForm
    const onValueChange = (event) => {
        let { value } = event.target;
        setDate(value);
        onDateChange(value, art);
    }

    return (
        <React.Fragment>
            <div className={checkboxStyle} >
                <input disabled={disabled} type="checkbox" checked={checked} onChange={onCheckChange}/>
                <label disabled={disabled}>{art}</label>
                <input disabled={disabled || !checked} type="date" value={date} onChange={onValueChange}/>
            </div>
        </React.Fragment>
    )
}

export default StudentForm