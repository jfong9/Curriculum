import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as studentsActions from 'actions/studentActions'
import StudentAdd from './StudentAdd';
import { renderWithRouterMatch } from 'utils/testHelper'

jest.mock('actions/studentActions', () => ({
    addStudent: jest.fn(),
    getStudentsByArt: jest.fn(),
}))

describe('StudentAdd form testing', () => {
    test('form calls addStudent on submit', () => {
        const addSpy = jest.spyOn(studentsActions, 'addStudent').mockResolvedValue({})
        const { getByTestId } = renderWithRouterMatch(StudentAdd, {
            route: '/jfong/MainPortal/Students/add',
            path: '/:username/MainPortal/Students/add'
        },{
            schoolid: 1
        })

        fireEvent.submit(getByTestId('submit-button'))
        expect(addSpy).toHaveBeenCalledTimes(1)
    })
})