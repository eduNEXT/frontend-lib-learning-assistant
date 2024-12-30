"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _optimizely = require("../data/optimizely");
const trackChatBotMessageOptimizely = function (userId) {
  let userAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const optimizelyInstance = (0, _optimizely.getOptimizely)();
  if (!optimizelyInstance || Object.keys(optimizelyInstance).length === 0) {
    return;
  }
  optimizelyInstance.onReady().then(() => {
    optimizelyInstance.track('learning_assistant_chat_message', userId, userAttributes);
  });
};
var _default = exports.default = trackChatBotMessageOptimizely;
//# sourceMappingURL=optimizelyExperiment.js.map