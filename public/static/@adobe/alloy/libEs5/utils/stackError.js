"use strict";

exports.default = void 0;
var _toError = require("./toError.js");
var _updateErrorMessage = require("./updateErrorMessage.js");
/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Augments an error's message with additional context as it bubbles up the call stack.
 * @param {String} message The message to be added to the error.
 * @param {*} error Optimally, this is an instance of Error. If it is not,
 * this is used as the basis for the message of a newly created Error instance.
 * @returns {*}
 */
var _default = ({
  error,
  message
}) => {
  const errorToStack = (0, _toError.default)(error);
  const newMessage = message + "\nCaused by: " + errorToStack.message;
  (0, _updateErrorMessage.default)({
    error: errorToStack,
    message: newMessage
  });
  return errorToStack;
};
exports.default = _default;