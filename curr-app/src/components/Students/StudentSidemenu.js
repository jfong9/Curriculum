import React from 'react'
import * as studentActions from 'actions/studentActions'
import ArtDropdown from 'components/ArtDropdown'
import DeleteButton from 'components/Buttons/Delete'
import style from './Students.module.css'

const StudentSidemenu = ({arts=[], students, studentClick, newClick, onDelete, ...props}) => {
    const deleteStudent = async (id) => {
        let success = await studentActions.deleteStudent(id);
        if (success) {
            onDelete(id);
        }
    }
    return (
        <div className={style.sideMenu}>
            <ArtDropdown {...props} className={style.artDropDown} arts={['All', ...arts]} defaultArt={'All'} />
            <button className={style.addStudent} onClick={() => newClick()}>Add New Student</button>
            <ul className={style.studentList}>
                {   students &&
                    students.map((s) => {
                    return (
                        <li key={s._id} className={style.studentListItem}>
                            <label className={style.studentTitle} onClick={()=>studentClick(s)}>{s.last_name} {s.first_name}</label>
                            <div className={style.studentListButtons}>
                                <DeleteButton 
                                    confirmText={`Delete ${s.first_name} ${s.last_name} from records?`}
                                    deleteFunc={() => deleteStudent(s._id)} />
                            </div>
                        </li>
                    )})
                } 
            </ul>
        </div>
    )
}

export default StudentSidemenu;