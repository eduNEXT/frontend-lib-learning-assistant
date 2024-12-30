"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _surveyMonkey = _interopRequireDefault(require("../../utils/surveyMonkey"));
var _APIError = _interopRequireDefault(require("../APIError"));
var _ChatBox = _interopRequireDefault(require("../ChatBox"));
var _Disclosure = _interopRequireDefault(require("../Disclosure"));
var _MessageForm = _interopRequireDefault(require("../MessageForm"));
var _UpgradePanel = _interopRequireDefault(require("../UpgradePanel"));
var _hooks = require("../../hooks");
var _xpertLogo = require("../../assets/xpert-logo.svg");
require("./Sidebar.scss");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Sidebar = _ref => {
  let {
    courseId,
    isOpen,
    setIsOpen,
    unitId
  } = _ref;
  const {
    apiError,
    disclosureAcknowledged,
    messageList
  } = (0, _reactRedux.useSelector)(state => state.learningAssistant);
  const {
    upgradeable,
    upgradeUrl,
    auditTrialExpired,
    auditTrialDaysRemaining
  } = (0, _hooks.useCourseUpgrade)();
  const {
    track
  } = (0, _hooks.useTrackEvent)();
  const chatboxContainerRef = (0, _react.useRef)(null);

  // this use effect is intended to scroll to the bottom of the chat window, in the case
  // that a message is larger than the chat window height.
  (0, _react.useEffect)(() => {
    const messageContainer = chatboxContainerRef.current;
    if (messageContainer) {
      const {
        scrollHeight,
        clientHeight
      } = messageContainer;
      const maxScrollTop = scrollHeight - clientHeight;
      const duration = 200;
      if (maxScrollTop > 0) {
        const startTime = Date.now();
        const endTime = startTime + duration;
        const scroll = () => {
          const currentTime = Date.now();
          const timeFraction = (currentTime - startTime) / duration;
          const scrollTop = maxScrollTop * timeFraction;
          messageContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
          if (currentTime < endTime) {
            requestAnimationFrame(scroll);
          }
        };
        requestAnimationFrame(scroll);
      }
    }
  }, [messageList, isOpen, apiError]);
  const handleClick = () => {
    setIsOpen(false);
    if (messageList.length >= 2) {
      (0, _surveyMonkey.default)();
    }
  };
  const getMessageForm = () => /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageForm.default, {
    courseId: courseId,
    shouldAutofocus: true,
    unitId: unitId
  });
  const handleUpgradeLinkClick = () => {
    track('edx.ui.lms.learning_assistant.days_remaining_banner_upgrade_click');
  };
  const getUpgradeLink = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
    onClick: handleUpgradeLinkClick,
    target: "_blank",
    href: upgradeUrl,
    rel: "noreferrer",
    "data-testid": "days_remaining_banner_upgrade_link",
    children: "Upgrade"
  });
  const getDaysRemainingMessage = () => {
    // eslint-disable-line consistent-return
    if (auditTrialDaysRemaining > 1) {
      const intlRelativeTime = new Intl.RelativeTimeFormat({
        style: 'long'
      });
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        "data-testid": "days-remaining-message",
        children: ["Your trial ends ", intlRelativeTime.format(auditTrialDaysRemaining, 'day'), ". ", getUpgradeLink(), " for full access to Xpert."]
      });
    }
    if (auditTrialDaysRemaining === 1) {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        "data-testid": "trial-ends-today-message",
        children: ["Your trial ends today! ", getUpgradeLink(), " for full access to Xpert."]
      });
    }
  };
  const getSidebar = () => /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "h-100 d-flex flex-column justify-content-stretch",
    "data-testid": "sidebar-xpert",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "p-3 sidebar-header",
      "data-testid": "sidebar-xpert-header",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_xpertLogo.ReactComponent, {})
    }), upgradeable && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "p-3 trial-header",
      "data-testid": "get-days-remaining-message",
      children: getDaysRemainingMessage()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "separator"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChatBox.default, {
      chatboxContainerRef: chatboxContainerRef,
      messageList: messageList
    }), apiError && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "d-flex flex-column p-3 mt-auto",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_APIError.default, {})
    }), getMessageForm()]
  });
  const getPanel = () => {
    const showUpgrade = upgradeable && auditTrialExpired;
    if (showUpgrade) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UpgradePanel.default, {});
    }
    return disclosureAcknowledged ? getSidebar() : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Disclosure.default, {
      children: getMessageForm()
    });
  };
  return isOpen && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "sidebar position-fixed",
    "data-testid": "sidebar",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.IconButton, {
      className: "chat-close position-absolute m-2 border-0",
      src: _icons.Close,
      iconAs: _paragon.Icon,
      onClick: handleClick,
      alt: "close",
      "aria-label": "close",
      variant: "primary",
      invertColors: true,
      "data-testid": "close-button"
    }), getPanel()]
  });
};
Sidebar.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  isOpen: _propTypes.default.bool.isRequired,
  setIsOpen: _propTypes.default.func.isRequired,
  unitId: _propTypes.default.string.isRequired
};
var _default = exports.default = Sidebar;
//# sourceMappingURL=index.js.map