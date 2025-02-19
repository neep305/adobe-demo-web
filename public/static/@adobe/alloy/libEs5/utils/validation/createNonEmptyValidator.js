"use strict";

exports.default = void 0;
var _utils = require("./utils.js");
var _isObject = require("../isObject.js");
var _isEmptyObject = require("../isEmptyObject.js");
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
var _default = message => (value, path) => {
  if ((0, _isObject.default)(value)) {
    (0, _utils.assertValid)(!(0, _isEmptyObject.default)(value), value, path, message);
  } else {
    (0, _utils.assertValid)(value.length > 0, value, path, message);
  }
  return value;
};
exports.default = _default;