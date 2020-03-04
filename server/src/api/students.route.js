
import { Router } from "express";
import StudentsCtrl from "./students.controller";

const router = new Router()

router.route("/").get(StudentsCtrl.apiGetStudents);
router.route("/getStudentById").get(StudentsCtrl.apiGetStudentById)
router.route("/addStudent").post(StudentsCtrl.apiAddStudent);
router.route("/updateStudent").patch(StudentsCtrl.apiUpdateStudent);
router.route("/deleteStudent").delete(StudentsCtrl.apiDeleteStudent);
export default router;