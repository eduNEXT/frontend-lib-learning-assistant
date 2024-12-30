"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _auth = require("@edx/frontend-platform/auth");
var _reactSdk = require("@optimizely/react-sdk");
var _i18n = require("@edx/frontend-platform/i18n");
var _optimizely = require("../data/optimizely");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ExperimentsProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    userId
  } = (0, _auth.getAuthenticatedUser)();
  const optimizely = (0, _optimizely.getOptimizely)();
  return optimizely ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactSdk.OptimizelyProvider, {
    optimizely: optimizely,
    user: {
      id: userId.toString(),
      attributes: {
        lms_language_preference: (0, _i18n.getLocale)()
      }
    },
    children: children
  }) : children;
};
ExperimentsProvider.propTypes = {
  children: _propTypes.default.node.isRequired
};
var _default = exports.default = ExperimentsProvider;
//# sourceMappingURL=ExperimentsProvider.js.map