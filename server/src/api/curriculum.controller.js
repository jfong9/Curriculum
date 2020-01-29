import CurriculumDAO from "../dao/curriculumDAO";

export default class CurriculumController {
    static async apiGetTopCategories(req, res, next) {
        const { categoriesList } = await CurriculumDAO.getTopCategories();
        let response = {
            categories: categoriesList
        }
        res.json(response);
    }

    static async apiAddTopCategory(req, res, next) {

    }
}