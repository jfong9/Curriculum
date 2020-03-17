
import { ObjectId } from "bson";

export default class studentsDAO {
    static async injectDB(conn, dbName) {
        if (this.students) {
            console.log("students already exists");
            return
        }
        try {
            this.db = await conn.db(dbName);
            this.collectionName = 'students'
            this.students = await conn.db(dbName).collection(this.collectionName);
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in schoolsDAO: ${e}`,
            )
        }
    }

    static async getStudentsBySchool(schoolUsername) {
        if ( !schoolUsername ) {
            console.warn('getStudents called with undefined arguments');
            schoolUsername = '';
        }
        try {
            const filter = { schoolid: schoolUsername}; 
            const sortby = { last_name: 1 };
            // const pipeline = [
            //     {
            //         $match: {
            //             username: {$in: usernames}
            //         }
            //     }
            // ]
            return await this.students.find(filter).sort(sortby).toArray();
                // const aggschools = await schools.aggregate(pipeline).toArray()
                // console.log(aggschools);
        } catch (e) {
            console.error(`Something went wrong in getStudents: ${e}`);
            throw e
        }
    }

    static async addStudent(student) {
        try{

            let res =  await this.students.insertOne(student)
            return res.ops[0];
        }
        catch (e) {
            console.error(`Something went wrong in addStudent: ${e}`);
            throw e;
        }
    }

    static async getStudentsByArt(schoolUsername, art) {
        if ( !schoolUsername || !art) {
            console.warn('getStudentsByArt called with undefined arguments');
            schoolUsername = '';
            art = '';
        }
        try {

            const filter = { schoolid: schoolUsername,
                         "arts.name": art}; 
            const sortby = { last_name: 1 };
            // const pipeline = [
            //     {
            //         $match: {
            //             username: {$in: usernames}
            //         }
            //     }
            // ]
            return await this.students.find(filter).sort(sortby).toArray();
            // const aggschools = await schools.aggregate(pipeline).toArray()
            // console.log(aggschools);
        } catch (e) {
            console.error(`Something went wrong in getStudents: ${e}`);
            throw e;
        }
    }

    static async getStudentById(id) {
        if ( !id ) {
            console.warn('getStudentById called with undefined arguments');
            id = '';
        }
        try {
            const filter = { _id: ObjectId(id)};
            return await this.students.findOne(filter); 
        } catch (e) {
            console.error(`Something went wrong in getStudentById: ${e}`);
            throw e;
        }
    }
    static async updateStudent(id, studentParameters) {
        if ( !id || !studentParameters ) {
            console.warn('invalid student trying to be updated');
            return;   
        }
        try {
            //may eventually want to use update with $set specifics when we get to more complex student objects
            let res = await this.students.updateOne({ _id: ObjectId(id) },  {$set: studentParameters});
            return res.modifiedCount;
        } catch (e) {
            console.error(`Something went wrong in updateStudent: ${e}`);
            throw e;
        }
    }

    static async deleteStudent(id) {
        if ( !id ) {
            console.warn('invalid student trying to be deleted');
            return;
        }
        try {
            let res = await this.students.deleteOne({ _id: ObjectId(id) })
            return res.deletedCount;

        } catch (e) {
            console.error(`Something went wrong with deleteStudent ${e}`)
            throw e;
        }
    }
}

