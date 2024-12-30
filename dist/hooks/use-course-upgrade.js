"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useCourseUpgrade;
var _react = require("react");
var _modelStore = require("@src/generic/model-store");
var _reactRedux = require("react-redux");
var _context = require("../context");
// eslint-disable-line import/no-unresolved

const millisecondsInOneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

/**
 * @typedef AuditTrial
 * @type {object}
 * @property {string} startDate Date String of when the Trial started.
 * @property {string} expirationDate Date String of when the Trial ends.
 */

/**
 * @typedef CourseUpgradeInfo
 * @type {object}
 * @property {boolean} upgradeable Should this user see a trial/upgrade option?.
 * @property {number} [auditTrialLengthDays] Audit Trial full length in days.
 * @property {number} [auditTrialDaysRemaining] Remaining day for the current trial (if any).
 * @property {boolean} [auditTrialExpired] True means that the audit has been taken and expired.
 * @property {AuditTrial} [auditTrial] The Audit trial information. Undefined if there's no trial for this user.
 * @property {string} [upgradeUrl] URL to redirect the user in case there's intention to upgrade.
 */

/**
 * This hook returns related data for the Course Upgrade.
 *
 * @returns {CourseUpgradeInfo}
 */
function useCourseUpgrade() {
  const {
    courseId,
    isUpgradeEligible
  } = (0, _react.useContext)(_context.CourseInfoContext);
  const {
    offer,
    accessExpiration,
    datesBannerInfo
  } = (0, _modelStore.useModel)('coursewareMeta', courseId);
  const {
    verifiedMode
  } = (0, _modelStore.useModel)('courseHomeMeta', courseId);
  const {
    auditTrialLengthDays,
    auditTrial
  } = (0, _reactRedux.useSelector)(state => state.learningAssistant);
  const upgradeUrl = (offer === null || offer === void 0 ? void 0 : offer.upgradeUrl) || (verifiedMode === null || verifiedMode === void 0 ? void 0 : verifiedMode.upgradeUrl);
  if (!isUpgradeEligible || !upgradeUrl) {
    return {
      upgradeable: false
    };
  }
  let auditTrialExpired = false;
  let auditTrialDaysRemaining;
  if (auditTrial !== null && auditTrial !== void 0 && auditTrial.expirationDate) {
    const auditTrialExpirationDate = new Date(auditTrial.expirationDate);
    auditTrialDaysRemaining = Math.ceil((auditTrialExpirationDate - Date.now()) / millisecondsInOneDay);
    auditTrialExpired = auditTrialDaysRemaining < 0;
  }
  const isFBE = !!accessExpiration && !!(datesBannerInfo !== null && datesBannerInfo !== void 0 && datesBannerInfo.contentTypeGatingEnabled);
  return {
    upgradeable: true,
    auditTrialLengthDays,
    auditTrialDaysRemaining,
    auditTrialExpired,
    auditTrial,
    upgradeUrl,
    isFBE
  };
}
//# sourceMappingURL=use-course-upgrade.js.map