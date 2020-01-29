"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _schools = _interopRequireDefault(require("./schools.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const express = require('express');
// const router = express.Router()
var router = new _express.Router();
router.route("/").get(_schools["default"].apiGetSchools);
var _default = router; // module.exports = router;

exports["default"] = _default;