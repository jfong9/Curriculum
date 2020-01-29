import request from "./request";

export function fetchSchools(schoolUsernames) {
    let query = schoolUsernames.map( name => `usernames[]=${name}`).join('&');
    return request(`/api/v1/schools?${query}`, { method: "GET"})
        .then(json => json.schools)
        .catch(err =>  console.log("Error fetching schools", err)) 
}