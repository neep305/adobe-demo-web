"use strict";

exports.default = void 0;
var _isString = require("./isString.js");
/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
/**
 * Returns whether a string value is blank. Also returns true if the value is not a string.
 * @param {*} value
 * @returns {boolean}
 */
var _default = value => (0, _isString.default)(value) ? !value.trim() : true;
exports.default = _default;