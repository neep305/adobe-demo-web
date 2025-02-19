"use strict";

exports.default = void 0;
var _isNil = require("./isNil.js");
var _filterObject = require("./filterObject.js");
var _isEmptyObject = require("./isEmptyObject.js");
var _isNonEmptyArray = require("./isNonEmptyArray.js");
var _isNonEmptyString = require("./isNonEmptyString.js");
var _isNumber = require("./isNumber.js");
var _isBoolean = require("./isBoolean.js");
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
// We want to avoid mapping between specific keys because we want Konductor
// to be able to add overrides in the future without us needing to make
// any changes to the Web SDK
var _default = configuration => {
  if ((0, _isNil.default)(configuration) || typeof configuration !== "object") {
    return null;
  }
  // remove entries that are empty strings or arrays
  const configOverrides = (0, _filterObject.default)(configuration, value => {
    if ((0, _isNil.default)(value)) {
      return false;
    }
    if ((0, _isBoolean.default)(value)) {
      return true;
    }
    if ((0, _isNumber.default)(value)) {
      return true;
    }
    if ((0, _isNonEmptyString.default)(value)) {
      return true;
    }
    if ((0, _isNonEmptyArray.default)(value)) {
      return true;
    }
    return false;
  });
  if ((0, _isEmptyObject.default)(configOverrides)) {
    return null;
  }
  return configOverrides;
};
exports.default = _default;