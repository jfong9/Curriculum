import { ObjectId } from "bson";

export default class studentCurrDAO {
    static async injectDB(conn, dbName) {
        if (this.studentCurrCurriculum) {
            console.log("studentCurrCurriculum already exists");
            return;
        }
        try {
            this.db = await conn.db(dbName);
            this.collectionName = 'studentCurrentCurriculum'
            this.studentCurrCurriculum = await conn.db(dbName).collection(this.collectionName);
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in studentCurrDAO: ${e}`,
            )
        }
    }

    static async createStudentCurrCurriculum(id, arts) {
        try {
            const collection = this.studentCurrCurriculum;
            let studentId = ObjectId(id)
            arts.forEach(async (art) => {
                if (await collection.find({studentId: studentId, art: art}).count() === 0) {
                    collection.insertOne({
                        studentId: studentId,
                        art: art,
                        topCategories: [],
                        currentCategories: [],
                        currentItems: [],
                        hiddenCategories: [],
                        hiddenItems: []
                    })
                }
            })
        } catch (e) {
            console.error(`Something went wrong in createStudentCurrCurriculum: ${e}`);
            throw e;
        }
    }
    
}