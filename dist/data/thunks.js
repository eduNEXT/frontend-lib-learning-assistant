"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acknowledgeDisclosure = acknowledgeDisclosure;
exports.addChatMessage = addChatMessage;
exports.clearApiError = clearApiError;
exports.getChatResponse = getChatResponse;
exports.getLearningAssistantChatSummary = getLearningAssistantChatSummary;
exports.updateCurrentMessage = updateCurrentMessage;
exports.updateSidebarIsOpen = updateSidebarIsOpen;
var _analytics = require("@edx/frontend-platform/analytics");
var _auth = require("@edx/frontend-platform/auth");
var _frontendPlatform = require("@edx/frontend-platform");
var _optimizelyExperiment = _interopRequireDefault(require("../utils/optimizelyExperiment"));
var _api = require("./api");
var _slice = require("./slice");
var _optimizely = require("./optimizely");
const _excluded = ["timestamp"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } return t; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function addChatMessage(role, content, courseId) {
  let promptExperimentVariationKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return (dispatch, getState) => {
    const {
      messageList,
      conversationId
    } = getState().learningAssistant;

    // Redux recommends only serializable values in the store, so we'll stringify the timestap to store in Redux.
    // When we need to operate on the Date object, we'll deserialize the string.
    const timestamp = new Date();
    const message = {
      role,
      content,
      timestamp: timestamp.toString()
    };
    const updatedMessageList = [...messageList, message];
    dispatch((0, _slice.setMessageList)({
      messageList: updatedMessageList
    }));
    dispatch((0, _slice.clearCurrentMessage)());
    dispatch((0, _slice.resetApiError)());
    const {
      userId
    } = (0, _auth.getAuthenticatedUser)();
    (0, _analytics.sendTrackEvent)('edx.ui.lms.learning_assistant.message', _objectSpread({
      id: conversationId,
      course_id: courseId,
      user_id: userId,
      timestamp: message.timestamp,
      role: message.role
    }, promptExperimentVariationKey ? {
      experiment_name: _optimizely.OPTIMIZELY_PROMPT_EXPERIMENT_KEY,
      variation_key: promptExperimentVariationKey
    } : {}));
  };
}
function getChatResponse(courseId, unitId, upgradeable) {
  let promptExperimentVariationKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  return async (dispatch, getState) => {
    const {
      userId
    } = (0, _auth.getAuthenticatedUser)();
    const {
      messageList
    } = getState().learningAssistant;
    dispatch((0, _slice.setApiIsLoading)(true));
    try {
      if (promptExperimentVariationKey) {
        (0, _optimizelyExperiment.default)(userId.toString());
      }
      const customQueryParams = promptExperimentVariationKey ? {
        responseVariation: promptExperimentVariationKey
      } : {};
      const message = await (0, _api.fetchChatResponse)(courseId, messageList, unitId, customQueryParams);

      // Refresh chat summary only on the first message for an upgrade eligible user
      // so we can tell if the user has just initiated an audit trial
      if (messageList.length === 1 && upgradeable) {
        // eslint-disable-next-line no-use-before-define
        dispatch(getLearningAssistantChatSummary(courseId));
      }
      dispatch((0, _slice.setApiIsLoading)(false));
      dispatch(addChatMessage(message.role, message.content, courseId, promptExperimentVariationKey));
    } catch (error) {
      dispatch((0, _slice.setApiError)());
      dispatch((0, _slice.setApiIsLoading)(false));
    }
  };
}
function updateCurrentMessage(content) {
  return dispatch => {
    dispatch((0, _slice.setCurrentMessage)({
      currentMessage: content
    }));
  };
}
function clearApiError() {
  return dispatch => {
    dispatch((0, _slice.resetApiError)());
  };
}
function acknowledgeDisclosure(isDisclosureAcknowledged) {
  return dispatch => {
    dispatch((0, _slice.setDisclosureAcknowledged)(isDisclosureAcknowledged));
  };
}
function updateSidebarIsOpen(isOpen) {
  return dispatch => {
    dispatch((0, _slice.setSidebarIsOpen)(isOpen));
  };
}
function getLearningAssistantChatSummary(courseId) {
  return async dispatch => {
    dispatch((0, _slice.setApiIsLoading)(true));
    try {
      const data = await (0, _api.fetchLearningAssistantChatSummary)(courseId);

      // Enabled
      dispatch((0, _slice.setIsEnabled)(data.enabled));

      // Message History
      const rawMessageList = data.message_history;

      // If returned message history data is not empty
      if (rawMessageList.length) {
        const messageList = rawMessageList.map(_ref => {
          let {
              timestamp
            } = _ref,
            msg = _objectWithoutProperties(_ref, _excluded);
          return _objectSpread(_objectSpread({}, msg), {}, {
            timestamp: new Date(timestamp).toString() // Parse ISO time to Date()
          });
        });
        dispatch((0, _slice.setMessageList)({
          messageList
        }));

        // If it has chat history, then we assume the user already aknowledged.
        dispatch((0, _slice.setDisclosureAcknowledged)(true));
      }

      // Audit Trial
      const auditTrial = {
        startDate: data.audit_trial.start_date,
        expirationDate: data.audit_trial.expiration_date
      };

      // Validate audit trial data & dates
      const auditTrialDatesValid = !(Number.isNaN(Date.parse(auditTrial.startDate)) || Number.isNaN(Date.parse(auditTrial.expirationDate)));
      if (Object.keys(auditTrial).length !== 0 && auditTrialDatesValid) {
        dispatch((0, _slice.setAuditTrial)((0, _frontendPlatform.camelCaseObject)(auditTrial)));
      }
      if (data.audit_trial_length_days) {
        dispatch((0, _slice.setAuditTrialLengthDays)(data.audit_trial_length_days));
      }
    } catch (error) {
      dispatch((0, _slice.setApiError)());
    }
    dispatch((0, _slice.setApiIsLoading)(false));
  };
}
//# sourceMappingURL=thunks.js.map