import request from "./request";

export const SCHOOLS_ROUTE = '/api/v1/schools';

function buildSchoolUsernamesQueryArgs (schoolUsernames) {
    if (!schoolUsernames) 
        schoolUsernames = [];
    return schoolUsernames.map( name => `usernames[]=${name}`).join('&');
}

export function fetchSchools(schoolUsernames) {
    let queryArgs = buildSchoolUsernamesQueryArgs(schoolUsernames);
    return request(`${SCHOOLS_ROUTE}?${queryArgs}`, { method: 'GET' })
        .then(json => json.schools)
        .catch(err =>  console.log("Error fetching schools", err)) 
}