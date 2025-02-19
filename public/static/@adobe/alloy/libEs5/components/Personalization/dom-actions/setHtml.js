"use strict";

exports.default = void 0;
var _index = require("../../../utils/dom/index.js");
var _index2 = require("./dom/index.js");
var _appendHtml = require("./appendHtml.js");
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

const clear = container => {
  // We want to remove ALL nodes, text, comments etc
  const childNodes = (0, _index2.getChildNodes)(container);
  childNodes.forEach(_index.removeNode);
};
var _default = (container, html, decorateProposition) => {
  clear(container);
  return (0, _appendHtml.default)(container, html, decorateProposition);
};
exports.default = _default;