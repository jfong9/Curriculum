"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _curriculum = _interopRequireDefault(require("./curriculum.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router();
router.route("/topCategories").get(_curriculum["default"].apiGetTopCategories);
router.route("/addTopCategory").get(_curriculum["default"].apiAddTopCategory);
var _default = router;
exports["default"] = _default;