const SchoolApiController = require("./schools.controller").default;
const SchoolsDAO = require('../dao/schoolsDAO').default;

const mockSchoolsRequest = (usernames) => {
    return {
        query: {
            usernames: usernames
        }
    }
}

const mockSchoolsResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('Schools Controller Tests #controller #cold', () => {
    describe('api Get Schools', () => {
        test('schools DAO get schools method is called once', async () => {
            const schoolDAOspy = jest.spyOn(SchoolsDAO, 'getSchools').mockReturnValue();
            const request = mockSchoolsRequest([]);
            const response = mockSchoolsResponse();
            await SchoolApiController.apiGetSchools(request, response);
            expect(schoolDAOspy).toHaveBeenCalledTimes(1);
        });
    });
})

