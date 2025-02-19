"use strict";

exports.splitWithEq = exports.isNotEqSelector = void 0;
var _index = require("../../../../utils/index.js");
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

const EQ_START = ":eq(";
const EQ_PATTERN = /:eq\((\d+)\)/g;
const isNotEqSelector = str => str.indexOf(EQ_START) === -1;
exports.isNotEqSelector = isNotEqSelector;
const splitWithEq = selector => {
  return selector.split(EQ_PATTERN).filter(_index.isNonEmptyString);
};
exports.splitWithEq = splitWithEq;