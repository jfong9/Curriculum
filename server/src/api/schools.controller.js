'use strict'
import SchoolsDAO from "../dao/schoolsDAO";
import { sendErrorResponse } from "./apiHelper";

export default class SchoolsController {
    static async apiGetSchools(req, res, next) {
        // console.log(req.query, res.json);
        try {
            let usersSchools = getUsersSchoolsFrom(req.query);
            const  schools  = await SchoolsDAO.getSchools(usersSchools)
            let response = {
                schools: schools,
            }
            res.status(200).json(response);
        } catch (err) {
            console.error(`SchoolsController apiGetSchools ${err}`)
            return sendErrorResponse(res, err);
        }
    }
}

function getUsersSchoolsFrom(query) {
    let usersSchools = query.usernames == "" ? [] : query.usernames;
    return Array.isArray(usersSchools) ? usersSchools : Array(usersSchools)
}