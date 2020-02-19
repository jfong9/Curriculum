import { ObjectId } from "bson";

export default class SchoolsDAO {
    static async injectDB(conn, dbName) {
        if (this.schools) {
            console.log("schools already exists");
            return
        }
        try {
            this.db = await conn.db(dbName);
            this.collectionName = 'schools'
            this.schools = await conn.db(dbName).collection(this.collectionName);
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in schoolsDAO: ${e}`,
            )
        }
    }

    static async getSchools(usernames) {
        console.log("usernames: ", usernames);
        if ( !usernames ) {
            console.warn('getSchools called with undefined arguments');
            usernames = [];
        }
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
        return await this.schools.find(filter).sort(sortby).toArray();
            // const aggschools = await schools.aggregate(pipeline).toArray()
            // console.log(aggschools);
        } catch (e) {
            console.error(`Something went wrong in getSchools: ${e}`);
            throw e
        }
    }
}

