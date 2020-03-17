import * as request from './request';
jest.mock('./request', () => jest.fn());
import * as mainPortalActions from 'actions/mainPortalActions'

describe("mainPortalActions.fetchSchools testing #actions #cold", () => {
     test('single matching school with no mismatches', async () => {
        expect.assertions(1);
        request.mockResolvedValue({schools: ['YMA'] });
        const data = await mainPortalActions.fetchSchools(['YMA'])
        
        expect(data.length).toEqual(1); //don't do this kind of test because we are essentially testing
                                        //the mocked request function and the thing we want to test is 
                                        //behavioral in the sense of "WHAT" happens when the request returns
                                        //a resolve or reject.
                                        //later when we are testing the REACT functions that call the fetchSchools
                                        // THEN we'll have to simulate the fetchschools responses.
        //This test will be left in to demonstrate learning purposes.
    });

    test('when request resolves with schools object, data expected to contain the schools item.', async () => {
        expect.assertions(1);
        const resolveObject = [ {username: 'YMA'}, {username: 'SayocNorCal'} ]

        request.mockResolvedValue({schools: resolveObject});
        const data = await mainPortalActions.fetchSchools()
        
        expect(JSON.stringify(data)).toEqual(JSON.stringify(resolveObject))
    });

    test('when request rejects, expect undefined', async () => {
        expect.assertions(1);
        
        request.mockRejectedValue('Test reject thrown, expected')
        const data = await mainPortalActions.fetchSchools()
        
        expect(data).toBeUndefined();
    })

    test('when request resolves to object without "schools" property, expect undefined', async () => {
        expect.assertions(1);

        request.mockResolvedValue('Not an object with school property');
        const data = await mainPortalActions.fetchSchools()
        
        expect(data).toBeUndefined();
    });

    test('request called with correct queryString, expect array of arguments passed in', async () => {
        expect.assertions(1);
        let schoolUsernames = ['YMA', 'SayocNorCal']
        let query = schoolUsernames.map( name => `usernames[]=${name}`).join('&');
        const requestSpy = jest.spyOn(request, 'default').mockResolvedValue({schools: [{username: 'YMA'}, {username: 'SayocNorCal'} ]})

        request.mockResolvedValue({schools: [{username: 'YMA'}, {username: 'SayocNorCal'} ]});
        await mainPortalActions.fetchSchools(schoolUsernames);

        expect(requestSpy).toHaveBeenCalledWith(`${mainPortalActions.SCHOOLS_ROUTE}?${query}`, {method: 'GET'});
    })
})