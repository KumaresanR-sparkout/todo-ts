"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Todo = /*#__PURE__*/_createClass(function Todo(name, done) {
  _classCallCheck(this, Todo);
  this.id = Todo.currentId++;
  this.name = name;
  this.done = done;
});
_defineProperty(Todo, "currentId", 0);
var todos = [new Todo("Eat", true), new Todo("Drink", false), new Todo("Sleep", false)];
var app = (0, _express["default"])();
var port = 3000;
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.get("/todos", function (req, res) {
  res.send(todos);
});
app.get("/todos/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var todo = todos.find(function (todo) {
    return todo.id === id;
  });
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send({
      message: "Todo not found"
    });
  }
});
app.post("/todos", function (req, res) {
  var id = todos.length + 1;
  var todo = new Todo(req.body.name, false);
  todos.push(todo);
  res.send(todo);
});
app.put("/todos/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var todo = todos.find(function (todo) {
    return todo.id === id;
  });
  if (todo) {
    todo = Object.assign(todo, req.body);
    res.send(todo);
  } else {
    res.status(404).send({
      message: "Todo not found"
    });
  }
});
app["delete"]("/todos/:id", function (req, res) {
  var id = parseInt(req.params.id);
  var index = todos.findIndex(function (todo) {
    return todo.id === id;
  });
  if (index !== -1) {
    todos.splice(index, 1);
    res.send({
      message: "Todo deleted"
    });
  } else {
    res.status(404).send({
      message: "Todo not found"
    });
  }
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});