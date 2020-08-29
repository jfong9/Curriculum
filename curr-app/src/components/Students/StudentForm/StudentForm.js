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
    }
    componentDidUpdate(prevProps) {
        const { loadStudent, studentLoaded, student } = this.props;
        if (loadStudent) {
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
   
    handleArtCheckboxChange = ( checked, date, art) => {
        const { arts, startDates, student } = this.state;

        let newArts;
        if (checked) {
            newArts = arts.concat(art);
        }
        else {
            newArts= arts.filter(a => a !== art)
        }
        let newDates = {...startDates}
        newDates[art] = date;

        this.setState({student: {...student, startDates: newDates, arts: newArts}, 
             arts: newArts, startDates: newDates, formChanged: true},
             () => console.log(this.state.student, this.state.startDates));
    }

    updateStudentArray = (key, value) => { 
        const { student } = this.state;
        console.log("updateStudent:", {key, value, student})
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
        const { submitText="Add", Buttons= () => null, submitDisabled = false, editDisabled, arts: schoolArts, artStyle, Icon = () => null} = this.props;
        return (
            <form className={style.studentForm} onSubmit={this.handleSubmit}>
                <Icon className={style.profilePicture}/> 
                <div className={style.studentInfo}> 
                    <label className={style.studentInput}>
                        First name: 
                        <input type='text' name='first_name' value={first_name} disabled={editDisabled} onChange={this.handleChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Last name: 
                        <input type='text' name='last_name' value={last_name} disabled={editDisabled} onChange={this.handleChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Birthdate: 
                        <input type='text' name='birthday' value={birthday} disabled={editDisabled} onChange={this.handleChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Email: 
                        <input type='text' name='email' value={email} disabled={editDisabled} onChange={this.handleChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Phone: 
                        <input type='text' name='phone' value={phone} disabled={editDisabled} onChange={this.handleChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Street: 
                        <input type='text' name='street' value={street} disabled={editDisabled} onChange={this.handleAddressChange}/>
                    </label>
                    <label className={style.studentInput}>
                        City: 
                        <input type='text' name='city' value={city} disabled={editDisabled} onChange={this.handleAddressChange}/>
                    </label>
                    <label className={style.studentInput}>
                        Zip: 
                        <input type='text' name='zip' value={zip} disabled={editDisabled} onChange={this.handleAddressChange}/>
                    </label>
                </div>
                
                <div className={`${style.arts} ${artStyle}`}>
                    {
                        schoolArts &&
                        schoolArts.map(art => 
                            <ArtCheckBox 
                                key={art} 
                                art={art}
                                defaultChecked={arts.includes(art)}
                                defaultDate={startDates[art]}
                                disabled={editDisabled} 
                                onCheckboxChange={this.handleArtCheckboxChange}
                            />)
                    }
                </div>
                <div className={style.buttons}>
                    {<Buttons className={style.buttons}/>}
                    <input className={style.submit} data-testid='submit-button' type='submit' disabled={(!formChanged || submitDisabled)} value={submitText}/>
                </div>
                <br/>
            </form>
        )
    }
}

const ArtCheckBox = ({checkboxStyle, art, disabled, onCheckboxChange, defaultChecked, defaultDate=""}) => {
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
        let newDate = date;
        setChecked(checked);
        if (date === "" && checked) {
            newDate = new Date();
            newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
            newDate = newDate.toISOString().slice(0, 10)
            setDate(newDate);
        }
        onCheckboxChange(checked, newDate, art)
    }
    
    //handles the local change and pushes the state up to the editForm
    const onValueChange = (event) => {
        let { value } = event.target;
        setDate(value);
        onCheckboxChange(checked, value, art);
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