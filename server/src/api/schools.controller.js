'use strict'
import SchoolsDAO from "../dao/schoolsDAO";

export default class SchoolsController {
    static async apiGetSchools(req, res, next) {
        // console.log(req.query, res.json);
        let usersSchools = getUsersSchoolsFrom(req.query);
        const  schools  = await SchoolsDAO.getSchools(usersSchools)
        let response = {
            schools: schools,
        }
        res.json(response);
    }
}

function getUsersSchoolsFrom(query) {
    let usersSchools = query.usernames == "" ? [] : query.usernames;
    return Array.isArray(usersSchools) ? usersSchools : Array(usersSchools)
}