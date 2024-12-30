"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
require("./Message.scss");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Message = _ref => {
  let {
    variant,
    message
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "message ".concat(variant, " ").concat(variant === 'user' ? 'align-self-end' : '', " text-left my-1 mx-2 py-2 px-3"),
    "data-hj-suppress": true,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactMarkdown.default, {
      children: message
    })
  });
};
Message.propTypes = {
  variant: _propTypes.default.string.isRequired,
  message: _propTypes.default.string.isRequired
};
var _default = exports.default = Message;
//# sourceMappingURL=index.js.map