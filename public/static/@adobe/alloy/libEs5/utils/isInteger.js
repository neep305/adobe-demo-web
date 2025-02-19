"use strict";

exports.default = void 0;
var _isNumber = require("./isNumber.js");
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
 * Returns whether the value is an integer.
 * @param {*} value
 * @returns {boolean}
 */
var _default = value => {
  const parsed = parseInt(value, 10);
  return (0, _isNumber.default)(parsed) && value === parsed;
};
exports.default = _default;