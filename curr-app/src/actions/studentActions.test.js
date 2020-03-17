import * as request from './request';
jest.mock('./request', () => jest.fn());
import * as studentActions from 'actions/studentActions'

describe("studentActions.addStudent tests #actions #cold", () => {
    test('when api resolves with student object, expect student returned', async () => {
        const resolvedObject = { 
            otherData: 'randomData',
            student: {
                first_name: "Jason",
                last_name: "Fong"
            }
        }
        request.mockResolvedValue(resolvedObject)

        const data = await studentActions.addStudent(resolvedObject.student, 'YMA')

        expect(JSON.stringify(data)).toEqual(JSON.stringify(resolvedObject.student))
    })
    test('when api rejects, expect undefined', async () => {
        request.mockRejectedValue('Test reject thrown, expected');

        const data = await studentActions.addStudent({}, 'YMA');

        expect(data).toBeUndefined();
    })
    test('when request resolves without student object, expect undefined return', async () => {
        const resolvedObject = { otherData: 'randomData' };
        request.mockResolvedValue(resolvedObject);

        const data = await studentActions.addStudent(resolvedObject.student, 'YMA')

        expect(data).toBeUndefined();
    })
})

describe("studentActions.getStudent tests #actions #cold", () => {
    const resolvedObject = {
        students: [ 
            {
                first_name: "Jason",
                last_name: "Fong"
            },
            {
                first_name: "Ray",
                last_name: "Young"
            }
        ]
    }
    test('when getStudentsBySchool resolves with students object, expect students returned', async () => {
        request.mockResolvedValue(resolvedObject);

        const data = await studentActions.getStudentsBySchool('YMA');

        expect(JSON.stringify(data)).toEqual(JSON.stringify(resolvedObject.students));
    })
    test('when getStudentsByArt resolves with students object, expect students returned', async () => {
        request.mockResolvedValue(resolvedObject);

        const data = await studentActions.getStudentsByArt('YMA', 'Kung Fu');

        expect(JSON.stringify(data)).toEqual(JSON.stringify(resolvedObject.students));
    })
    test('when getStudentById resolves with students object, expect students returned', async () => {
        const student = {first_name: "Jason"}
        request.mockResolvedValue({student});

        const data = await studentActions.getStudentById('1');

        expect(JSON.stringify(data)).toEqual(JSON.stringify(student));
    })
})

describe("studentActions.updateStudent tests #actions #cold", () => {
    test('when updateStudent resolves with success, expects success returned', async () => {
        request.mockResolvedValue({success: true});

        const success = await studentActions.updateStudent({first_name: 'Jason'});

        expect(success).toBe(true);
    })
})

describe("studentActions.deleteStudent tests #actions #cold", () => {
    test('when deleteStudent resolves with success, expects success returned', async () => {
        request.mockResolvedValue({success: true});

        const success = await studentActions.deleteStudent(1);

        expect(success).toBe(true);
    })
})