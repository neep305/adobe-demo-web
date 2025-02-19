"use strict";

exports.default = void 0;
var _querySelectorAll = require("./querySelectorAll.js");
var _selectNodesWithShadow = require("./selectNodesWithShadow.js");
var _isShadowSelector = require("./isShadowSelector.js");
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
 * Returns an array of matched DOM nodes.
 * @param {String} selector
 * @param {Node} [context=document] defaults to document
 * @returns {Array} an array of DOM nodes
 */
var _default = (selector, context = document) => {
  if (!(0, _isShadowSelector.default)(selector)) {
    return (0, _querySelectorAll.default)(context, selector);
  }
  return (0, _selectNodesWithShadow.default)(context, selector);
};
exports.default = _default;