"use strict";

exports.default = void 0;
var _isNumber = require("./isNumber.js");
var _isString = require("./isString.js");
/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/*
 * coerce `value` to a number or return `defaultValue` if it cannot be.
 *
 * The coersion is attempted if value is a number or string.
 */
var _default = (value, defaultValue) => {
  if ((0, _isNumber.default)(value) || (0, _isString.default)(value)) {
    const n = Math.round(Number(value));
    if (!Number.isNaN(n)) {
      return n;
    }
  }
  return defaultValue;
};
exports.default = _default;