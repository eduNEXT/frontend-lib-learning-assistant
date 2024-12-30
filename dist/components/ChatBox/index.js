"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Message = _interopRequireDefault(require("../Message"));
require("./ChatBox.scss");
var _MessageDivider = _interopRequireDefault(require("../MessageDivider"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

// container for all of the messages
const ChatBox = _ref => {
  let {
    chatboxContainerRef
  } = _ref;
  const {
    messageList,
    apiIsLoading
  } = (0, _reactRedux.useSelector)(state => state.learningAssistant);
  const messagesBeforeToday = messageList.filter(m => !isToday(new Date(m.timestamp)));
  const messagesToday = messageList.filter(m => isToday(new Date(m.timestamp)));

  // message divider should not display if no messages or if all messages sent today.
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: chatboxContainerRef,
    className: "flex-grow-1 scroller d-flex flex-column pb-4",
    children: [messagesBeforeToday.map(_ref2 => {
      let {
        role,
        content,
        timestamp
      } = _ref2;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
        variant: role,
        message: content
      }, timestamp);
    }), messageList.length !== 0 && messagesBeforeToday.length !== 0 && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageDivider.default, {
      text: "Today"
    }), messagesToday.map(_ref3 => {
      let {
        role,
        content,
        timestamp
      } = _ref3;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message.default, {
        variant: role,
        message: content
      }, timestamp);
    }), apiIsLoading && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "loading",
      children: "Xpert is thinking"
    })]
  });
};
ChatBox.propTypes = {
  chatboxContainerRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({
    current: _propTypes.default.instanceOf(Element)
  })]).isRequired
};
var _default = exports.default = ChatBox;
//# sourceMappingURL=index.js.map