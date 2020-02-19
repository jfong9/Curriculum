require("dotenv").config();
const {MongoClient} = require('mongodb');
const SchoolsDAO = require('./schoolsDAO').default;

async function setupSchoolDAODatabase () {
    let mockSchools = [
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
    ];
    await SchoolsDAO.schools.insertMany(mockSchools);
}

async function teardownSchoolDAODatabase () {
    await SchoolsDAO.schools.drop();
}

describe('Schools DAO tests #DAL', () => {
    let connection;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await SchoolsDAO.injectDB(connection, process.env.TEST_DB);
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await setupSchoolDAODatabase();
    });

    afterEach(async () => {
        await teardownSchoolDAODatabase();
    });

    test('getSchools call returns school objects that match given school usernames', async () => {
        let usernameList = ['YMA', 'SayocNorCal']

        const schoolList = await SchoolsDAO.getSchools(usernameList)

        expect(Array.isArray(schoolList)).toBe(true); 
        expect(schoolList.length).toEqual(usernameList.length);
    })

    test('getSchools call returns only objects that match', async () => {
        let usernameList = ['YMA', 'SayocNorCal', 'BadSchoolName']

        const schoolList = await SchoolsDAO.getSchools(usernameList)

        expect(schoolList.length).toEqual(2);
    });
    
    test('getSchools returns empty array on no match', async () => {
        let usernameList = ['BadSchoolName']

        const schoolList = await SchoolsDAO.getSchools(usernameList)

        expect(Array.isArray(schoolList)).toBe(true); 
        expect(schoolList.length).toEqual(0);
    });
    
    test('getSchools returns empty array with falsy arguments', async () => {
        let undefinedSchoolList = await SchoolsDAO.getSchools(undefined);
        let nullSchoolList = await SchoolsDAO.getSchools(null);
        let emptySchoolList = await SchoolsDAO.getSchools([]);

        expect(undefinedSchoolList.length).toEqual(0);
        expect(nullSchoolList.length).toEqual(0);
        expect(emptySchoolList.length).toEqual(0);
    });
});