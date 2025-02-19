"use strict";

exports.default = void 0;
var _index = require("../utils/index.js");
var _createConsentStateMachine = require("./consent/createConsentStateMachine.js");
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
var _default = ({
  errorPrefix,
  logger
}) => (error, operation) => {
  const err = (0, _index.toError)(error);

  // In the case of declined consent, we've opted to not reject the promise
  // returned to the customer, but instead resolve the promise with an
  // empty result object.
  if (err.code === _createConsentStateMachine.DECLINED_CONSENT_ERROR_CODE) {
    logger.warn("The " + operation + " could not fully complete. " + err.message);
    return {};
  }
  (0, _index.updateErrorMessage)({
    error: err,
    message: errorPrefix + " " + err.message
  });
  throw err;
};
exports.default = _default;