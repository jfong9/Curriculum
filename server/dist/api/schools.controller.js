'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _schoolsDAO = _interopRequireDefault(require("../dao/schoolsDAO"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SchoolsController =
/*#__PURE__*/
function () {
  function SchoolsController() {
    _classCallCheck(this, SchoolsController);
  }

  _createClass(SchoolsController, null, [{
    key: "apiGetSchools",
    value: function () {
      var _apiGetSchools = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var usersSchools, userSchoolsArray, schools, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                usersSchools = req.query.usernames == "" ? [] : req.query.usernames;
                userSchoolsArray = Array.isArray(usersSchools) ? usersSchools : Array(usersSchools);
                _context.next = 4;
                return _schoolsDAO["default"].apiGetSchools(userSchoolsArray);

              case 4:
                schools = _context.sent;
                response = {
                  schools: schools
                };
                res.json(schools);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function apiGetSchools(_x, _x2, _x3) {
        return _apiGetSchools.apply(this, arguments);
      }

      return apiGetSchools;
    }()
  }]);

  return SchoolsController;
}();

exports["default"] = SchoolsController;