import { wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as sidebarActions from 'actions/sidebarActions'
import SideBar from './SideBar';
import { renderWithRouterMatch } from 'utils/testHelper'

jest.mock('actions/sidebarActions', () => ({
    fetchSchools: jest.fn(),
}));

describe('SideBar UI Testing #ui #cold', () => {
    test('school names loaded after being fetched, expect resolved objects to be in the document ', async () => {
        let testSchools = ['test1', 'test2', 'test3']
        sidebarActions.fetchSchools.mockResolvedValue(testSchools.map(schoolName => { return {name: schoolName}}));
        const mockHandleStateChange = () => {}
        const { getByText } = renderWithRouterMatch(SideBar, 
            {
                route: '/MainPortal',
                path:'/MainPortal'
            }, 
            {
                handleSchoolChange: mockHandleStateChange,
                user: {}
            });

        await wait(() => getByText(testSchools[0])); //success means the intended resolved objects were rendered
        testSchools.forEach(schoolName => expect(getByText(schoolName)).toBeInTheDocument())
    });

    test('handleStateChange is sent selected school, expect default school to be set', async () => {
        let testSchools = ['test1', 'test2', 'test3']
        sidebarActions.fetchSchools.mockResolvedValue(testSchools.map(schoolName => { return {name: schoolName}}));
        let schoolSent = false;
        const mockHandleStateChange = (selectedSchool) => {
            if (selectedSchool.name === testSchools[0])
                schoolSent = true;
        }
        const { getByText } = renderWithRouterMatch(SideBar, 
            {
                route: '/MainPortal',
                path:'/MainPortal'
            }, 
            {
                handleSchoolChange: mockHandleStateChange,
                user: {},
            });

        await wait(() => getByText(testSchools[0]));
        expect(schoolSent).toBe(true);
    });
})