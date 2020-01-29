import { ObjectId } from "bson";

let curriculum;

export default class CurriculumDAO {
    static async injectDB(conn) {
        if (curriculum) {
            return;
        }
        try {
            curriculum = await conn.db(process.env.CURRAPP_NS).collection("curriculum")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in curriculumDAO: ${e}`,
            )
        }
    }
    static async getTopCategories ({
        schoolid = null,
        art = null
    } = {}) {
        const pipeline = [
            {
                $match: {
                    schoolid: schoolid,
                }
            }
        ]
    }
}