import { fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as studentsActions from 'actions/studentActions'
import StudentEdit from './StudentEdit';
import { renderWithRouterMatch } from 'utils/testHelper'

jest.mock('actions/studentActions', () => ({
    updateStudent: jest.fn(),
    getStudentById: jest.fn(),
}))

describe('StudentEdit form testing', () => {
    let student = {            
                "_id": 1,
                "first_name": "Shea",
                "last_name": "Cummings",
                "birthday": "12/09/1983",
                "email": "pretium@nuncullamcorpereu.net",
                "phone": "(989) 113-3909",
                "address": {
                    "street": "100-4841 Nam Street",
                    "city": "Copiapó",
                    "zip": "55718"
                },
                "schoolid": "YMA",
                "arts": [
                            "Kung Fu",
                            "Judo"
                        ],
                "startDates": {
                    "Kung Fu": "2020-07-14",
                    "Judo": "2020-07-13"
                }
                    
                
        }
    test('form calls updateStudent on submit', () => {
        studentsActions.getStudentById.mockResolvedValue(student)
        const updateSpy = jest.spyOn(studentsActions, 'updateStudent').mockResolvedValue({
        })
        const { getByTestId } = renderWithRouterMatch(StudentEdit, {
            route: '/jfong/MainPortal/Students/edit',
            path: '/:username/MainPortal/Students/edit'
        },{
            location: {
                state: {
                    id: 1
                }
            }
        })

        fireEvent.submit(getByTestId('submit-button'))
        expect(updateSpy).toHaveBeenCalledTimes(1)
    })

    test('Two required buttons exist, expect update, edit, delete', () => {
        studentsActions.getStudentById.mockResolvedValue(student)
        const { getByText } = renderWithRouterMatch(StudentEdit, {
            route: '/jfong/MainPortal/Students/edit',
            path: '/:username/MainPortal/Students/edit'
        },{
            location: {
                state: {
                    id: 1
                }
            }
        })

        expect(getByText(/edit/i)).toBeInTheDocument();
        expect(getByText(/update/i)).toBeInTheDocument();
    })
})