'use strict'
import StudentsDAO from "../dao/studentsDAO";
import { sendErrorResponse } from "./apiHelper";

export default class StudentsController {
    static async apiGetStudentsBySchool(req, res, next) {
        try {
            const query = req.query;
            let schoolName = getSchoolNameFromQuery(query);
            const students  = await StudentsDAO.getStudentsBySchool(schoolName)
            let response = {
                students
            }
            res.status(200).json(response);
        } catch (err) {
            console.error(`StudentsController apiGetStudentsBySchool ${err}`)
            return sendErrorResponse(res, err);
        }
    }
    static async apiGetStudentsByArt(req, res, next) {
        try {
            const query = req.query;
            let schoolName = getSchoolNameFromQuery(query);
            let art = getArtFromQuery(req.query);
            const students  = await StudentsDAO.getStudentsByArt(schoolName, art)
            let response = {
                students
            }
            res.status(200).json(response);
        } catch (err) {
            console.error(`StudentsController apiGetStudentsByArt ${err}`)
            return sendErrorResponse(res, err);
        }
    }
    static async apiGetStudentById(req, res) {
        try {
            const query = req.query;
            let id = getIdFrom(query);
            const student  = await StudentsDAO.getStudentById(id)
            let response = {
                student
            }
            res.status(200).json(response);
        } catch (err) {
            console.error(`StudentsController apiGetStudentsById ${err}`)
            return sendErrorResponse(res, err);
        }

    }

    static async apiAddStudent(req, res) {
        try {
            const body = req.body;
            validateAddStudentBody(body);
            let student = getStudentFromBody(body); 
            let addedStudent = await StudentsDAO.addStudent(student);
            let response = {
                student: addedStudent
            }
            res.status(200).json(response);
        } catch (err) {
            const msg = Object.values(err).join('\n');
            console.error(`StudentsController apiAddStudent ${msg}`)
            return sendErrorResponse(res, msg);
        }           
    }

    static async apiUpdateStudent(req, res) {
        try {
            const body = req.body;
            validateUpdateStudentBody(body);
            switch (body.op) {
                case "update": {
                    let updateParams = getUpdateParamsFromStudent(body.student)
                    let modifiedCount = await StudentsDAO.updateStudent(body.id, updateParams);
                    if (modifiedCount === 0 && Object.keys(updateParams).length > 0) {
                        res.status(500).json( {error: "update unsuccessful"})
                        return;
                    }
                    let response = {
                        success: true
                    }
                    res.status(200).json(response);
                    break;
                }
                default:
                    throw "invalid update op";
            }
        } catch (err) {
            const msg = Object.values(err).join('\n');
            console.error(`StudentsController apiUpdateStudent ${msg}`)
            return sendErrorResponse(res, msg);
        }
    }

    static async apiDeleteStudent(req, res) {
        try {
            const body = req.body;
            let id = getIdFrom(body);
            let deletedCount = await StudentsDAO.deleteStudent(id);
            if (deletedCount === 0) {
                res.status(500).json( {error: "delete unsuccessful"})
                return;
            }
            let response = {
                success: true
            }
            res.status(200).json(response);
        } catch (err) {
            console.error(`StudentsController apiDeleteStudent ${err}`)
            return sendErrorResponse(res, err);
        }
    }
}

function getNonEmptyPropFrom(obj, prop) {
    validateField(obj, prop); 
    return obj[prop];
}

function getSchoolNameFromQuery(query) {
    return getNonEmptyPropFrom(query, "schoolid");
}

function getArtFromQuery(query) {
    return getNonEmptyPropFrom(query, "art");
}

function getIdFrom(obj) {
    return getNonEmptyPropFrom(obj, "id")
}

function getStudentFromBody(body) {
    try {
        const student = {
            ...body.student,
            schoolid: body.schoolid
        }
        return student;
    } catch (err) {
        throw err;
    }
}
function validateUpdateStudentBody(body) {
    const requiredBodyFields = ['id', 'op']
    validateFields(body, requiredBodyFields);
    if (Object.keys(body.student).length === 0) {
        throw "no fields to update"
    } 
}
function validateAddStudentBody(body) {
   const requiredBodyFields = ['schoolid'] 
   validateFields(body, requiredBodyFields);

   const requiredStudentFields = ['first_name', 'last_name']
   validateFields(body.student, requiredStudentFields);
}

function isEmptyProp(obj, prop) {
    if ( !obj.hasOwnProperty(prop) || !obj[prop] || obj[prop] === '') {
        return true;
    }
    return false;
}

function validateField(obj, field) {
    if (isEmptyProp(obj, field)) {
        throw `${field} not provided`;
    }
}
function validateFields(obj, fields) {
    const errors = {};
    fields.forEach(field => {
        if (isEmptyProp(obj, field)) {
            errors[field] = `${field} not provided`;
        }
    })

    if(Object.keys(errors).length > 0) {
        throw errors;
    }
}

function getUpdateParamsFromStudent(student) {
    const studentCopy = JSON.parse(JSON.stringify(student));
    delete studentCopy._id;
    delete studentCopy.schoolid;
    return studentCopy;
}