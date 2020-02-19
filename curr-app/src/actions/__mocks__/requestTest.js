///This mock method is useless as I was initally using it to test
///"action" items or api calls, but it really ends up testing implementation of the server side
///functionality which is what we are NOT testing. 
///instead I can do what is actually tested now. 

export default function request(url, options) {
    return new Promise((resolve, reject) => {
        let queryString = url.split('?')[1];
        process.nextTick(()=>  {
            switch(true) {
                case url.includes('/api/v1/schools?'): {
                    if (options.method === "GET") {
                        resolve(getSchoolsRequest(queryString)) ;
                    }
                    break;
                }
                default: {
                    reject( {error: 'invalid URL request'})
                    break;
                }
            }
        })
    })
}

const mockSchools = [
        {
            "username": "YMA",
            "name": "Yee's Martial Arts",
            "arts": ["Kung Fu", "Judo"]
        },
        {
            "username": "SayocNorCal",
            "name": "Sayoc NorCal",
            "arts": ["Kali"]
        },
        {
            "username": "BMMA",
            "name": "Bay Mountain Wing Tsun",
            "arts": ["Wing Tsun"]
        }
]
function getSchoolsRequest(queryString) {
    let usernames = queryString.split('&').map(str => str.slice('usernames[]='.length))
    const matchingSchools = mockSchools.filter(school => usernames.includes(school.username))
    return {schools: matchingSchools};
}