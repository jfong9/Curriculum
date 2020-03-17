import { wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as studentsActions from 'actions/studentActions'
import Students from './Students';
import { renderWithRouterMatch } from 'utils/testHelper'

jest.mock('actions/studentActions', () => ({
    addStudent: jest.fn(),
    getStudentsBySchool: jest.fn(),
    getStudentsByArt: jest.fn(),
    getStudentById: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
}));

describe('Students main page testing', () => {
    let students = [
        {
            _id: 1,
            first_name: 'Jason',
            last_name: 'Fong'
        }, 
        {
            _id: 2,
            first_name: 'Raymond',
            last_name: 'Young'
        },
        {
            _id: 3,
            first_name: 'Corona',
            last_name: 'Virus'
        }
    ]

    test('students returned from get are listed', async () => {
        studentsActions.getStudentsBySchool.mockResolvedValue(students);
        const { getByText } = renderWithRouterMatch(Students,
            {
                route: '/jfong/Students',
                path: '/:username/Students'
            } );
        let name = (student) => new RegExp(student.last_name, 'i') 
        await wait(() => getByText(name(students[0])))
        students.forEach(student => expect(getByText(name(student))).toBeInTheDocument())
    })
})
