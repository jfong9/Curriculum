const SchoolApiController = require("./schools.controller").default;
const SchoolsDAO = require('../dao/schoolsDAO').default;

const mockGoodSchoolsRequest = (usernames) => {
    return {
        query: {
            usernames: usernames
        }
    }
}

const mockBadSchoolsRequest = () => {
    return {
        query: {
            randomField: "field not included",
        }
    }
}
const mockSchoolsResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    //  code => ({
    //     send: message => ({code, message})
    // })
    res.json = jest.fn().mockReturnValue(res);
    
    return res;
}

describe('Schools Controller Tests #controller #cold', () => {
    describe('api Get Schools', () => {
        test('schools DAO get schools method is called once', async () => {
            const schoolDAOspy = jest.spyOn(SchoolsDAO, 'getSchools').mockReturnValue();
            const request = mockGoodSchoolsRequest([]);
            const response = mockSchoolsResponse();
            
            await SchoolApiController.apiGetSchools(request, response);

            expect(schoolDAOspy).toHaveBeenCalledTimes(1);
        });

        test('DAO rejection, expect 400 error code return', async () => {
            jest.spyOn(SchoolsDAO, 'getSchools').mockRejectedValue("expected DAO rejection");
            const request = mockGoodSchoolsRequest();
            const response = mockSchoolsResponse();

            await SchoolApiController.apiGetSchools(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: "expected DAO rejection"});
        })

        test('bad school request, expect 200 status and returning resolved value', async () => {
            jest.spyOn(SchoolsDAO, 'getSchools').mockResolvedValue([]);
            const request = mockBadSchoolsRequest();
            const response = mockSchoolsResponse();

            await SchoolApiController.apiGetSchools(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ schools: [] });
        })

    });
})

