"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("./users.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router(); // associate put, delete, and get(id)
// router.route("/register").post(usersCtrl.register)

router.route("/login").post(_users["default"].login);
router.route("/logout").post(_users["default"].logout); // router.route("/delete").delete(usersCtrl.delete)
// router.route("/update-preferences").put(usersCtrl.save)
// router.route("/comment-report").get(commentsCtrl.apiCommentReport)
// router.route("/make-admin").post(usersCtrl.createAdminUser)

var _default = router;
exports["default"] = _default;