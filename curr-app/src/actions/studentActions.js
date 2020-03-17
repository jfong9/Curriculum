
import request from "./request";

export const STUDENTS_ROUTE = '/api/v1/students';

export function addStudent(student, schoolid) {
    console.log("action:", student, schoolid)
    const data = {
        schoolid,
        student
    }
    return request(`${STUDENTS_ROUTE}/addStudent`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "content-type":"application/json"
        },
    })
    .then(json => json.student)
    .catch(err => console.log("Error adding student", err))
}

export function getStudentsBySchool(schoolid) {
    return request(`${STUDENTS_ROUTE}?schoolid=${schoolid}`, {method: 'GET'})
    .then(json => json.students)
    .catch(err => console.log("Error getting students by school", err))
}

export function getStudentsByArt(schoolid, art) {
    return request(`${STUDENTS_ROUTE}/getStudentsByArt?schoolid=${schoolid},art=${art}`, {method: 'GET'})
    .then(json => json.students)
    .catch(err => console.log("Error getting students by art", err))
}

export function getStudentById(id) {
    console.log("getting by ID", id)
    return request(`${STUDENTS_ROUTE}/getStudentById?id=${id}`, {method: 'GET'})
    .then(json => json.student)
    .catch(err => console.log("Error getting students by id", err))
}

export function updateStudent(student) {
    const data = {
        op: 'update',
        id: student._id,
        student
    }
    return request(`${STUDENTS_ROUTE}/updateStudent`, { 
        method: 'PATCH',
        body: JSON.stringify(data),
        mode: 'cors',
        headers: {
            "content-type":"application/json"
        }
    })
    .then(json => json.success)
    .catch(err => console.log("Error updating student", err))
}

export function deleteStudent(id) {
    return request(`${STUDENTS_ROUTE}/deleteStudent`, { 
        method: 'DELETE',
        body: JSON.stringify( { id }),
        mode: 'cors', 
        headers: {
            "content-type":"application/json"
        }
    })
    .then(json => json.success)
    .catch(err => console.log("Error deleting student", err))
}