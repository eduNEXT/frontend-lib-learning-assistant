"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchChatResponse = fetchChatResponse;
exports.fetchLearningAssistantChatSummary = fetchLearningAssistantChatSummary;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
async function fetchChatResponse(courseId, messageList, unitId) {
  let customQueryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const payload = messageList.map(message => ({
    role: message === null || message === void 0 ? void 0 : message.role,
    content: message === null || message === void 0 ? void 0 : message.content
  }));
  let queryParams = _objectSpread({
    unitId
  }, customQueryParams);
  queryParams = (0, _frontendPlatform.snakeCaseObject)(queryParams);
  let queryString = new URLSearchParams(queryParams);
  queryString = queryString.toString();
  const url = new URL("".concat((0, _frontendPlatform.getConfig)().CHAT_RESPONSE_URL, "/").concat(courseId, "?").concat(queryString));
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(url.href, payload);
  return data;
}
async function fetchLearningAssistantChatSummary(courseId) {
  const url = new URL("".concat((0, _frontendPlatform.getConfig)().CHAT_RESPONSE_URL, "/").concat(courseId, "/chat-summary"));
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
  return data;
}
//# sourceMappingURL=api.js.map