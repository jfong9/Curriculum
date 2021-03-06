require("dotenv").config();
import { ObjectId } from "bson";
const {MongoClient} = require('mongodb');
const StudentsDAO = require('./studentsDAO').default;
const mockStudents = require('./__fixtures__/students').mockStudents;   

async function setupStudentsDAODatabase () {
    await StudentsDAO.students.insertMany(mockStudents);
}

async function teardownStudentsDAODatabase () {
    await StudentsDAO.students.drop();
}

describe('Schools DAO tests #DAL', () => {
    let connection;

    beforeAll(async () => {
        connection = await MongoClient.connect(process.env.TEST_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await StudentsDAO.injectDB(connection, process.env.TEST_DB);
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await setupStudentsDAODatabase();
    });

    afterEach(async () => {
        await teardownStudentsDAODatabase();
    });

    test('get students, expects various array sizes depending on parameters', async () => {
        const YMAStudents = await StudentsDAO.getStudentsBySchool('YMA');
        const SayocStudents = await StudentsDAO.getStudentsBySchool('SayocNorCal');
        const NoStudents = await StudentsDAO.getStudentsBySchool('BadSchoolName');

        console.log(YMAStudents)
        expect(YMAStudents.length).toBe(4); 
        expect(SayocStudents.length).toBe(3); 
        expect(NoStudents.length).toBe(0);
    });

    test('get students by art, expects various array sizes depending on parameters', async () => {
        const YMAKFStudents = await StudentsDAO.getStudentsByArt('YMA', 'Kung Fu');
        const SayocStudents = await StudentsDAO.getStudentsByArt('SayocNorCal', 'Kali');
        const BadSchoolStudents = await StudentsDAO.getStudentsByArt(undefined, 'Kung Fu');
        const BadArtStudents = await StudentsDAO.getStudentsByArt('YMA', undefined);

        expect(YMAKFStudents.length).toBe(2);
        expect(SayocStudents.length).toBe(1);
        expect(BadSchoolStudents.length).toBe(0);
        expect(BadArtStudents.length).toBe(0);
    });

    let newStudent = {
        "first_name": "Jason",
        "last_name": "Fong",
        "schoolid": "YMA",
    }
    
    test('get students by id, expect specific student', async () => {
        let newStudentA = JSON.parse(JSON.stringify(newStudent));
        let id = ObjectId('100000000002')
        newStudentA._id = id
        await StudentsDAO.addStudent(newStudentA);

        let student = await StudentsDAO.getStudentById(id);
        expect(student._id.toString()).toStrictEqual(id.toString());
    })

    test('get students by id with invalid id number, expect null', async () => {
        await expect(StudentsDAO.getStudentById(ObjectId("000000000000"))).resolves.toBeNull();
    })

    test('add student, expect plus one student', async () => {
        let students = await StudentsDAO.getStudentsBySchool('YMA');
        let studentCountBefore = students.length;
        
        await StudentsDAO.addStudent(newStudent);
        students = await StudentsDAO.getStudentsBySchool('YMA');
        
        expect(students.length).toBe(studentCountBefore + 1)
    })

    test('add student, expect the added document to be returned', async () => {
        let addedStudent = await StudentsDAO.addStudent(newStudent)

        expect(addedStudent._id).not.toBeUndefined();
    })

    test('add existing student, expect exception thrown', async () => {
        let addedStudent = await StudentsDAO.addStudent(newStudent);
        await expect(StudentsDAO.addStudent(addedStudent)).rejects.toThrow('E11000');
    })

    test('update student, expect update count and record change', async () => {
        let id = ObjectId("123456789012");
        let newStudentA = JSON.parse(JSON.stringify(newStudent));
        newStudentA._id = id;
        await StudentsDAO.addStudent(newStudentA);

        let student = await StudentsDAO.getStudentById(id);
        let newName = "Jackson";
        let modCount = await StudentsDAO.updateStudent(student._id, {first_name: newName});
       
        student = await StudentsDAO.getStudentById(id);
        expect(modCount).toBe(1)
        expect(student.first_name).toBe(newName);
    })

    test('delete student, expect delete count and record deletion', async () => {
        let students = await StudentsDAO.getStudentsBySchool('YMA');
        expect(students.length).toBe(4);

        let deleteCount = await StudentsDAO.deleteStudent(ObjectId("000000000001"));
        students = await StudentsDAO.getStudentsBySchool('YMA');

        expect(deleteCount).toBe(1);
        expect(students.length).toBe(3);
    })
});