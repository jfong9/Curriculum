'use strict'
import SchoolsDAO from "../dao/schoolsDAO";

export default class SchoolsController {
    static async apiGetSchools(req, res, next) {
        console.log(req.query);
        let usersSchools = req.query.usernames == "" ? [] : req.query.usernames;
        let userSchoolsArray = Array.isArray(usersSchools) ? usersSchools : Array(usersSchools)
        const  schools  = await SchoolsDAO.getSchools(userSchoolsArray)
        let response = {
            schools: schools,
        }
        res.json(response);
    }
}