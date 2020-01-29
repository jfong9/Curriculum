import { ObjectId } from "bson";

let schools
let testdb

export default class SchoolsDAO {
    static async injectDB(conn) {
        if (schools) {
            return
        }
        try {
            testdb = await conn.db(process.env.CURRAPP_NS);
            schools = await conn.db(process.env.CURRAPP_NS).collection("schools");
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in schoolsDAO: ${e}`,
            )
        }
    }

    static async getSchools(usernames) {
        console.log("usernames: ", usernames);
        try {

        const filter = { username: {$in: usernames}}; 
        const sortby = { username: -1 };
        // const pipeline = [
        //     {
        //         $match: {
        //             username: {$in: usernames}
        //         }
        //     }
        // ]
        return await schools.find(filter).sort(sortby).toArray();
            // const aggschools = await schools.aggregate(pipeline).toArray()
            // console.log(aggschools);
        } catch (e) {
            console.error(`Something went wrong in getSchools: ${e}`);
            throw e
        }

    }
}