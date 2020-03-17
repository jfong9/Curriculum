const StudentApiController = require("./students.controller").default;
const StudentsDAO = require("../dao/studentsDAO").default;


const mockGetStudentRequest = (fields = {}) => {
    return {
        query: fields 
    }
}
const mockBodyRequest = (fields = {}) => {
    return {
        body: fields
    }
}
const mockPostStudentRequest = mockBodyRequest;
const mockDeleteStudentRequest = mockBodyRequest; 
const mockPutStudentRequest = mockBodyRequest;

const mockStudentsResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

describe('Students Controller Tests #controller #cold', () => {
    describe('DAO methods called once', () => {
        test('apiGetStudents', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentsBySchool').mockReturnValue();
            const request = mockGetStudentRequest({schoolid: 'YMA' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsBySchool(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);
        })

        test('apiGetStudentsByArt', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentsByArt').mockReturnValue();
            const request = mockGetStudentRequest({ schoolid: 'YMA', art: 'Kung Fu' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsByArt(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);
        })
        
        test('apiGetStudentById', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentById').mockReturnValue();
            const request = mockGetStudentRequest({ id: 'abcd' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentById(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);

        })
        
        test('apiAddStudent', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'addStudent').mockReturnValue();
            const request = mockPostStudentRequest({ 
                schoolid: 'YMA', 
                student: {
                    first_name: 'Shea',
                    last_name: 'Butter',
                } 
            });
            const response = mockStudentsResponse();

            await StudentApiController.apiAddStudent(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);

        })
        
        test('apiUpdateStudent', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'updateStudent').mockReturnValue();
            const request = mockPutStudentRequest({
                op: "update",
                id: 1,
                student: {
                    first_name: "Shea",
                    last_name: "Buttes",
                    schoolid: 'YMA'
                }
            })
            const response = mockStudentsResponse();

            await StudentApiController.apiUpdateStudent(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);

        })
        
        test('apiDeleteStudent', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'deleteStudent').mockReturnValue();
            const request = mockDeleteStudentRequest({ id: 1 });
            const response = mockStudentsResponse();

            await StudentApiController.apiDeleteStudent(request, response);

            expect(studentDAOSpy).toHaveBeenCalledTimes(1);
        })
    }),
    describe('apiGetStudents tests', () => {

        test('apiGetStudentsBySchool with schoolid, expects 200 status and returning resolved value', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentsBySchool').mockResolvedValue([]);
            const request = mockGetStudentRequest({ schoolid: 'YMA' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsBySchool(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ students: [] });
        })
        
        test('apiGetStudentsBySchool with invalid schoolid, expects 400 status and returning resolved value', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentsBySchool').mockResolvedValue([]);
            const request = mockGetStudentRequest();
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsBySchool(request, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: 'schoolid not provided' });
        })

        test('apiGetStudentsByArt with valid params, expects 200 status and returning resolved value', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentsByArt').mockResolvedValue([]);
            const request = mockGetStudentRequest({ schoolid: 'YMA', art: 'Kung Fu' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsByArt(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ students: [] });
        })
        
        test('apiGetStudentsByArt with invalid params, expects 400 status and returning error msg', async () => {
            jest.spyOn(StudentsDAO, 'getStudentsByArt').mockResolvedValue([]);
            const noParamRequest = mockGetStudentRequest();
            const schoolOnlyRequest = mockGetStudentRequest({ schoolid: 'YMA' })
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentsByArt(noParamRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: 'schoolid not provided' });
            
            await StudentApiController.apiGetStudentsByArt(schoolOnlyRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: 'art not provided' });
        })
        
        test('apiGetStudentsById with valid params, expects 200 status and returning resolved value', async () => {
            const studentDAOSpy = jest.spyOn(StudentsDAO, 'getStudentById').mockResolvedValue({});
            const request = mockGetStudentRequest({ id: 'abcd' });
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentById(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ student: {} });
        })

        test('apiGetStudentsById with invalid params, expects 400 status and returning error msg', async () => {
            jest.spyOn(StudentsDAO, 'getStudentById').mockResolvedValue({});
            const noParamRequest = mockGetStudentRequest();
            const blankIdRequest = mockGetStudentRequest({ id: '' })
            const response = mockStudentsResponse();

            await StudentApiController.apiGetStudentById(noParamRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: 'id not provided' });
            
            await StudentApiController.apiGetStudentById(blankIdRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.send).toHaveBeenCalledWith({ msg: 'id not provided' });
        })
    })

    describe('apiAddStudent', () => {
        test('apiAddStudent with valid params, expects 200 status with returned student', async () => {
            jest.spyOn(StudentsDAO, 'addStudent').mockResolvedValue({});
            const request = mockPostStudentRequest({
                schoolid: 'YMA',
                student: {
                    first_name: "Shea",
                    last_name: "Buttes"
                }
            })
            const response = mockStudentsResponse();

            await StudentApiController.apiAddStudent(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
        }) 
        test('apiAddStudent with invalid params, expects 400 status with various errors', async () => {
            jest.spyOn(StudentsDAO, 'addStudent').mockResolvedValue({});
            const noSchoolRequest = mockPostStudentRequest({
                schoolid: '',
                student: {
                    first_name: "Shea",
                    last_name: "Buttes"
                }
            })
            const noNamesRequest = mockPostStudentRequest({
                schoolid: 'YMA',
                student: {
                    first_name: "",
                    last_name: ""
                }
            })
            const noFirstRequest = mockPostStudentRequest({
                schoolid: '',
                student: {
                    first_name: "",
                    last_name: "Buttes"
                }
            })
            const noLastRequest = mockPostStudentRequest({
                schoolid: '',
                student: {
                    first_name: "Shea",
                    last_name: ""
                }
            })
            const response = mockStudentsResponse();

            await StudentApiController.apiAddStudent(noSchoolRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            await StudentApiController.apiAddStudent(noNamesRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            await StudentApiController.apiAddStudent(noFirstRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
            await StudentApiController.apiAddStudent(noLastRequest, response);
            expect(response.status).toHaveBeenCalledWith(400);
        }) 
    })
    describe('apiDeleteStudent', () => {
        test('apiDeleteStudent with valid params, expects 200 status with success true', async () => {
            jest.spyOn(StudentsDAO, 'deleteStudent').mockResolvedValue(1);
            const request = mockDeleteStudentRequest({
                id: 1 
            })
            const response = mockStudentsResponse();

            await StudentApiController.apiDeleteStudent(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({success: true})
        }) 
        test('apiDeleteStudent with nonexistant record, expects 500 status', async () => {
            jest.spyOn(StudentsDAO, 'deleteStudent').mockResolvedValue(0);
            const request = mockDeleteStudentRequest({
                id: 1 
            })
            const response = mockStudentsResponse();

            await StudentApiController.apiDeleteStudent(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({error: "delete unsuccessful"})
        }) 
        test('apiDeleteStudent with invalid params, expects 400 status', async () => {
            jest.spyOn(StudentsDAO, 'deleteStudent').mockResolvedValue(0);
            const request = mockDeleteStudentRequest({ })
            const response = mockStudentsResponse();

            await StudentApiController.apiDeleteStudent(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
        }) 
    })
    describe('apiUpdateStudent', () => {
            const validMockStudent = () => { 
                return {
                    op: "update",
                    id: 1,
                    student: {
                        _id: 1,
                        first_name: "Shea",
                        last_name: "Buttes",
                        schoolid: 'YMA'
                    }
                }
            }
        test('apiUpdateStudent with valid params, expects 200 status', async () => {
            jest.spyOn(StudentsDAO, 'updateStudent').mockResolvedValue(2)
            const request = mockPutStudentRequest(validMockStudent())

            const response = mockStudentsResponse();
            await StudentApiController.apiUpdateStudent(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({success: true})
        })
        test('apiUpdateStudent updated 0 items, expects 200 status', async () => {
            jest.spyOn(StudentsDAO, 'updateStudent').mockResolvedValue(0)
            const request = mockPutStudentRequest(validMockStudent())

            const response = mockStudentsResponse();
            await StudentApiController.apiUpdateStudent(request, response);
            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({error: "update unsuccessful"})
        })
        test('apiUpdateStudent calls DAO with correct parameters ommitted, expects 200 status', async () => {
            const updateSpy = jest.spyOn(StudentsDAO, 'updateStudent').mockResolvedValue(1)
            const expectedStudent = validMockStudent();
            delete expectedStudent.student._id;
            delete expectedStudent.student.schoolid;
            const request = mockPutStudentRequest(validMockStudent())
            const response = mockStudentsResponse();
            
            await StudentApiController.apiUpdateStudent(request, response);

            expect(updateSpy).toHaveBeenCalledWith(expectedStudent.id, expectedStudent.student)
            expect(response.status).toHaveBeenCalledWith(200);
        })
    })
})
