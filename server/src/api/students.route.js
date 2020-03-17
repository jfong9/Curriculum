
import { Router } from "express";
import StudentsCtrl from "./students.controller";

const router = new Router()

router.route("/").get(StudentsCtrl.apiGetStudentsBySchool);
router.route("/getStudentsByArt").get(StudentsCtrl.apiGetStudentsByArt)
router.route("/getStudentById").get(StudentsCtrl.apiGetStudentById)
router.route("/addStudent").post(StudentsCtrl.apiAddStudent);
router.route("/updateStudent").patch(StudentsCtrl.apiUpdateStudent);
router.route("/deleteStudent").delete(StudentsCtrl.apiDeleteStudent);
export default router;