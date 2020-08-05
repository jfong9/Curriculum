import React from 'react'
import style from './Students.module.css'
import Tabs from 'components/Tabs/Tabs'
import { StudentCurrCurric } from './StudentCurrCurric'

function StudentCurriculum({loadedStudent, schoolId}) {
    if (!loadedStudent) return null;
    console.log({loadedStudent})
    return (
        <div className={style.studentCurriculumDisplay}>
            <Tabs>
                { 
                  loadedStudent.arts.map( art => {
                      return (
                          <div className="test" key={art} label={art}>
                              <StudentCurrCurric studentId={loadedStudent._id} schoolId={schoolId} art={art}/>
                          </div>
                      )
                  })
                }
            </Tabs>
        </div>
    )
}

export default StudentCurriculum;