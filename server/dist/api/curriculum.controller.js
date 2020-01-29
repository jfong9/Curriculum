"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _curriculumDAO = _interopRequireDefault(require("../dao/curriculumDAO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CurriculumController =
/*#__PURE__*/
function () {
  function CurriculumController() {
    _classCallCheck(this, CurriculumController);
  }

  _createClass(CurriculumController, null, [{
    key: "apiGetTopCategories",
    value: function () {
      var _apiGetTopCategories = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var _ref, categoriesList, response;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _curriculumDAO["default"].getTopCategories();

              case 2:
                _ref = _context.sent;
                categoriesList = _ref.categoriesList;
                response = {
                  categories: categoriesList
                };
                res.json(response);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function apiGetTopCategories(_x, _x2, _x3) {
        return _apiGetTopCategories.apply(this, arguments);
      }

      return apiGetTopCategories;
    }()
  }, {
    key: "apiAddTopCategory",
    value: function () {
      var _apiAddTopCategory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function apiAddTopCategory(_x4, _x5, _x6) {
        return _apiAddTopCategory.apply(this, arguments);
      }

      return apiAddTopCategory;
    }()
  }]);

  return CurriculumController;
}();

exports["default"] = CurriculumController;