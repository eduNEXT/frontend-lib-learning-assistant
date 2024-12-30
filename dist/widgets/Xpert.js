"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = require("react");
var _reactRedux = require("react-redux");
var _thunks = require("../data/thunks");
var _ToggleXpertButton = _interopRequireDefault(require("../components/ToggleXpertButton"));
var _Sidebar = _interopRequireDefault(require("../components/Sidebar"));
var _experiments = require("../experiments");
var _context = require("../context");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Xpert = _ref => {
  let {
    courseId,
    contentToolsEnabled,
    unitId,
    isUpgradeEligible
  } = _ref;
  const dispatch = (0, _reactRedux.useDispatch)();
  const courseInfo = (0, _react.useMemo)(() => ({
    courseId,
    unitId,
    isUpgradeEligible
  }), [courseId, unitId, isUpgradeEligible]);
  const {
    isEnabled,
    sidebarIsOpen
  } = (0, _reactRedux.useSelector)(state => state.learningAssistant);
  const setSidebarIsOpen = isOpen => {
    dispatch((0, _thunks.updateSidebarIsOpen)(isOpen));
  };
  (0, _react.useEffect)(() => {
    dispatch((0, _thunks.getLearningAssistantChatSummary)(courseId));
  }, [dispatch, courseId]);
  return isEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.CourseInfoProvider, {
    value: courseInfo,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_experiments.ExperimentsProvider, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleXpertButton.default, {
          courseId: courseId,
          isOpen: sidebarIsOpen,
          setIsOpen: setSidebarIsOpen,
          contentToolsEnabled: contentToolsEnabled
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sidebar.default, {
          courseId: courseId,
          isOpen: sidebarIsOpen,
          setIsOpen: setSidebarIsOpen,
          unitId: unitId
        })]
      })
    })
  }) : null;
};
Xpert.propTypes = {
  courseId: _propTypes.default.string.isRequired,
  contentToolsEnabled: _propTypes.default.bool.isRequired,
  unitId: _propTypes.default.string.isRequired,
  isUpgradeEligible: _propTypes.default.bool.isRequired
};
var _default = exports.default = Xpert;
//# sourceMappingURL=Xpert.js.map