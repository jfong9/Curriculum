import { Router } from "express";
import CurriculumCtrl from "./curriculum.controller";

const router = new Router()

router.route("/topCategories").get(CurriculumCtrl.apiGetTopCategories);
router.route("/addTopCategory").get(CurriculumCtrl.apiAddTopCategory);
export default router;