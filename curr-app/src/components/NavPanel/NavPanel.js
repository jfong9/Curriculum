"use strict"

import React from 'react'
import styles from './NavPanel.module.css'
import { Link } from 'react-router-dom'
import { ReactComponent as StudentsIcon} from 'assets/icons/academic.svg';
import { ReactComponent as CurriculumIcon} from 'assets/icons/file.svg';
import { ReactComponent as AttendanceIcon} from 'assets/icons/calendar.svg';
import { ReactComponent as ClassesIcon} from 'assets/icons/blackboard.svg';

const NavPanel = ({schoolun, match}) => {
        const isInitialized = () => {
            console.log("NavPanel", schoolun, match)
            return schoolun && match 
        }
        return (
            <React.Fragment>
                {isInitialized() &&
                <div className={styles.navPanel}>
                    <div className={styles.navItem}>
                        <div className={styles.link}>
                            <Link className={styles.link} to={{pathname:`${match.url}/Students`,
                                state: {
                                    schoolun: schoolun 
                                }}}>
                                <div className={styles.iconContainer}>
                                    <StudentsIcon className={styles.icon}/>
                                    Students
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.navItem}>
                        <div className={styles.link}>
                           <Link className={styles.link} to={`${match.url}/Curriculum`}>
                                <div className={styles.iconContainer}>
                                    <CurriculumIcon className={styles.icon}/>
                                   Curriculum 
                                </div>
                            </Link>
                        </div>
                    </div>     
                    <div className={styles.navItem}>
                        <div className={styles.link}>
                           <Link className={styles.link} to={`${match.url}`}>
                                <div className={styles.iconContainer}>
                                    <AttendanceIcon className={styles.icon}/>
                                   Attendance 
                                </div>
                            </Link>
                        </div>
                    </div> 
                    <div className={styles.navItem}>
                        <div className={styles.link}>
                           <Link className={styles.link} to={`${match.url}`}>
                                <div className={styles.iconContainer}>
                                    <ClassesIcon className={styles.icon}/>
                                   Classes 
                                </div>
                            </Link>
                        </div>
                    </div> 
                </div>}
                <div className={styles.attribution}>
                    <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small>
                </div> 
            </React.Fragment>
            
                    
    )
}


export default NavPanel