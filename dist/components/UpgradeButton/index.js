"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _hooks = require("../../hooks");
require("./UpgradeButton.scss");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const UpgradeButton = _ref => {
  let {
    includeLockIcon,
    trackingEventName
  } = _ref;
  const {
    upgradeUrl
  } = (0, _hooks.useCourseUpgrade)();
  const {
    track
  } = (0, _hooks.useTrackEvent)();
  const handleClick = () => track(trackingEventName);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
    onClick: handleClick,
    href: upgradeUrl,
    className: "trial-upgrade mt-3",
    variant: "brand",
    "data-testid": "upgrade-cta",
    block: true,
    children: [includeLockIcon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: _icons.LockOpen,
      className: "my-0 mx-2",
      "data-testid": "lock-icon"
    }) : null, "Upgrade now"]
  });
};
UpgradeButton.propTypes = {
  includeLockIcon: _propTypes.default.bool,
  trackingEventName: _propTypes.default.string.isRequired
};
UpgradeButton.defaultProps = {
  includeLockIcon: false
};
var _default = exports.default = UpgradeButton;
//# sourceMappingURL=index.js.map