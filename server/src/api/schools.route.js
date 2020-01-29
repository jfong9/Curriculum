
import {Router} from "express"
import SchoolsCtrl from "./schools.controller"

// const express = require('express');
// const router = express.Router()

const router = new Router()

router.route("/").get(SchoolsCtrl.apiGetSchools)

export default router;
// module.exports = router;